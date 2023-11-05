export function formatNumberWithKM(number) {
  number = parseInt(number);
  if (number >= 1000000) {
    const num = (number / 1000000).toFixed(1);
    return num + "M";
  } else if (number >= 1000) {
    const num = Math.floor(number / 1000);
    return num + "k";
  }
  return number.toString();
}

export function processName(name) {
  let words = name.split(" ");
  let result = "";

  if (words.length >= 2) {
    result = words[0].charAt(0) + words[1].charAt(0);
  } else if (words.length === 1) {
    result = words[0].slice(0, 2);
  }

  return result;
}


export function getProcessingStatesDropdown() {
  let processingStates = [
    {
      "id": 1,
      "name": "Dropped",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:51",
      "updated_date": "2021-05-16 13:15:51",
      "active": true,
      "positive": false,
      "positivity_rank": 0
    },
    {
      "id": 2,
      "name": "Rejected",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:53",
      "updated_date": "2021-05-16 13:15:53",
      "active": true,
      "positive": false,
      "positivity_rank": 0
    },
    {
      "id": 3,
      "name": "Not_Interested",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:54",
      "updated_date": "2021-05-16 13:15:54",
      "active": true,
      "positive": false,
      "positivity_rank": 0
    },
    {
      "id": 4,
      "name": "On_Hold",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:55",
      "updated_date": "2021-05-16 13:15:55",
      "active": true,
      "positive": false,
      "positivity_rank": 0
    },
    {
      "id": 5,
      "name": "Selected",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:56",
      "updated_date": "2021-05-16 13:15:56",
      "active": true,
      "positive": true,
      "positivity_rank": 4
    },
    {
      "id": 6,
      "name": "No_Show",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:57",
      "updated_date": "2021-05-16 13:15:57",
      "active": true,
      "positive": false,
      "positivity_rank": 0
    },
    {
      "id": 7,
      "name": "Offered",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:58",
      "updated_date": "2021-05-16 13:15:58",
      "active": true,
      "positive": true,
      "positivity_rank": 5
    },
    {
      "id": 8,
      "name": "New",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:59",
      "updated_date": "2021-05-16 13:15:59",
      "active": true,
      "positive": true,
      "positivity_rank": 0
    },
    {
      "id": 9,
      "name": "Joined",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-22 02:51:24",
      "updated_date": "2021-05-22 02:51:24",
      "active": true,
      "positive": true,
      "positivity_rank": 6
    },
    {
      "id": 10,
      "name": "Period_Complete",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-22 02:51:25",
      "updated_date": "2021-05-22 02:51:25",
      "active": true,
      "positive": true,
      "positivity_rank": 7
    },
    {
      "id": 11,
      "name": "Interviewed",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-22 02:51:26",
      "updated_date": "2021-05-22 02:51:26",
      "active": true,
      "positive": true,
      "positivity_rank": 3
    },
    {
      "id": 12,
      "name": "Shortlisted",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-22 02:51:27",
      "updated_date": "2021-05-22 02:51:27",
      "active": true,
      "positive": true,
      "positivity_rank": 2
    },
    {
      "id": 13,
      "name": "In_Process",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-06-24 02:55:52",
      "updated_date": "2021-06-24 02:55:52",
      "active": true,
      "positive": true,
      "positivity_rank": 1
    },
    {
      "id": 14,
      "name": "Quit",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-09-13 16:31:36",
      "updated_date": "2021-09-13 16:31:36",
      "active": true,
      "positive": false,
      "positivity_rank": 0
    },
    {
      "id": 15,
      "name": "Non-contactable",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2022-06-26 05:56:27",
      "updated_date": "2022-06-26 05:56:27",
      "active": true,
      "positive": false,
      "positivity_rank": 0
    }
   ]
   return processingStates;   
}

export function getCategories() {
  let categories = [
    {
      "id": 1,
      "name": "BPO",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:51",
      "updated_date": "2021-05-16 13:15:51",
      "active": true,
     
    },
    {
      "id": 6,
      "name": "IT",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:51",
      "updated_date": "2021-05-16 13:15:51",
      "active": true,
     
    },
    {
      "id": 7,
      "name": "NOT IT",
      "created_by": "admin",
      "updated_by": "admin",
      "created_date": "2021-05-16 13:15:51",
      "updated_date": "2021-05-16 13:15:51",
      "active": true,
     
    }
   ]
   return categories;   
}