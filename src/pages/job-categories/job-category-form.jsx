import Spinner from "@/components/organism/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFirebaseImageUpload from "@/hooks/useFirebaseImageUpload";
import { addCategory, updateCategory } from "@/services/JobCategories";
import { PlusIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function JobCategoryForm({ initialData, onSuccessAction }) {
  const isEditMode = typeof initialData === "object";
  const queryClient = useQueryClient();
  const defaultValues = {
    name: initialData?.name || "",
  };

  const form = useForm({
    defaultValues,
  });

  const categoryMutation = useMutation({
    mutationFn: isEditMode ? updateCategory : addCategory,
    onSuccess: ({ data }) => {
      isEditMode
        ? toast.success("Category edited successfully!!")
        : toast.success("Category added successfully!!");

      queryClient.invalidateQueries({ queryKey: ["All-Categories"] });
      if (onSuccessAction) onSuccessAction();
    },
    onError: () => {
      toast.error("Failed to edit category!!");
    },
  });

  const {
    handleChange,
    handleUpload,
    imageBlob,
    image,
    isLoading: imgUploadIsLoading,
  } = useFirebaseImageUpload();

  async function onSubmit(data) {
    const uploadedImageUrl = await handleUpload();

    let payload = {
      name: data?.name,
      ...(uploadedImageUrl || initialData?.imageURL
        ? { imgUrl: uploadedImageUrl }
        : { imgUrl: initialData?.imageURL }),
    };

    console.log(payload);
    if (isEditMode) {
      // edit category
      payload.id = initialData?.id;
      categoryMutation.mutate(payload);
    } else {
      // add to category
      categoryMutation.mutate(payload);
    }
  }

  const isLoading = categoryMutation.isLoading || imgUploadIsLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex-col w-full text-sm flex_center text-muted-foreground">
          <div className="w-20 h-20 mb-2 duration-300 border rounded-full hover:border-primary overflow-hidden">
            <label htmlFor="image" className="w-full h-full flex_center ">
              {imageBlob ? (
                <img
                  src={imageBlob}
                  alt="upload_image"
                  className="object-contain"
                />
              ) : initialData?.imageURL ? (
                <img
                  src={initialData.imageURL}
                  alt="category image"
                  className="object-contain"
                />
              ) : (
                <PlusIcon className="w-4 h-4" />
              )}
              <input
                id="image"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>

          <p>
            {initialData?.imageURL
              ? "Click image to edits"
              : image?.name
              ? image?.name
              : "Upload image"}
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Spinner className="text-white" />
          ) : isEditMode ? (
            "Edit Category"
          ) : (
            "Add Category"
          )}
        </Button>
      </form>
    </Form>
  );
}
