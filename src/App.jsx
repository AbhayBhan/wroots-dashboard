import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import MainLayout from "./components/layouts/main";
// import AppUsers from "./pages/app-users";
// import AppUserDetail from "./pages/app-users/details";
// import CandidateDetail from "./pages/candidate/detail";
// import CandidateList from "./pages/candidate/list";
// import Company from "./pages/company";
// import CompanyDetails from "./pages/company/details";
// import Dashboard from "./pages/dashboard";
// import Job from "./pages/job";
// import JobCategories from "./pages/job-categories";
// import JobDetail from "./pages/job/detail";
// import Location from "./pages/location";
// import Payout from "./pages/payout";
// import Recruiter from "./pages/recruiter";
// import RecruiterDetails from "./pages/recruiter/details";
// import Skill from "./pages/skill";

import React, { lazy, Suspense } from "react";
import Spinner from "@/components/organism/spinner";
import { CandidateProvider } from "./contexts/candidateContext";
import { AppUsersProvider } from "./contexts/appUsersContext";

const LazyMainLayout = lazy(() => import("./components/layouts/main"));
const LazyAppUsers = lazy(() => import("./pages/app-users"));
const LazyAppUserDetail = lazy(() => import("./pages/app-users/details"));
const LazyCandidateDetail = lazy(() => import("./pages/candidate/detail"));
const LazyCandidateList = lazy(() => import("./pages/candidate/list"));
const LazyCompany = lazy(() => import("./pages/company"));
// const LazyCompanyDetails = lazy(() => import("./pages/company/details"));
const LazyDashboard = lazy(() => import("./pages/dashboard"));
const LazyJob = lazy(() => import("./pages/job"));
const LazyJobCategories = lazy(() => import("./pages/job-categories"));
const LazyJobDetail = lazy(() => import("./pages/job/detail"));
const LazyLocation = lazy(() => import("./pages/location"));
const LazyPayout = lazy(() => import("./pages/payout"));
const LazyRecruiter = lazy(() => import("./pages/recruiter"));
const LazyRecruiterDetails = lazy(() => import("./pages/recruiter/details"));
const LazySkill = lazy(() => import("./pages/skill"));
const LazyAuthentication = lazy(() => import("./pages/auth"))

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="w-full py-10 flex_center">
              <Spinner />
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<LazyAuthentication />} />
            <Route path="/" element={<LazyMainLayout />}>
              <Route index element={<LazyDashboard />} />
              <Route path="candidate" element={<LazyCandidateList />} />
              <Route
                path="candidate/:id/details"
                element={
                  <CandidateProvider>
                    <LazyCandidateDetail />
                  </CandidateProvider>
                }
              />
              <Route path="company" element={<LazyCompany />} />
              {/* <Route path="company/details" element={<LazyCompanyDetails />} /> */}
              <Route path="recruiter" element={<LazyRecruiter />} />
              <Route
                path="recruiter/:id/details"
                element={<LazyRecruiterDetails />}
              />
              <Route path="job" element={<LazyJob />} />
              <Route path="job/:id/details" element={<LazyJobDetail />} />
              <Route path="job-categories" element={<LazyJobCategories />} />
              <Route path="skill" element={<LazySkill />} />
              <Route path="app-users" element={
                <AppUsersProvider>
              <LazyAppUsers />
                  </AppUsersProvider>
              } />
              <Route path="app-users/details/:id" element={
              <AppUsersProvider>
                <LazyAppUserDetail />
              </AppUsersProvider>
              } />
              <Route path="location" element={<LazyLocation />} />
              <Route path="payout" element={<LazyPayout />} />
            </Route>
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
