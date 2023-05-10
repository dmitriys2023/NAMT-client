

// @ts-ignore
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import { StudentPage} from "./page/student/student";
import {Layout} from "./components/layout/layout";
import {EmploymentPage} from "./page/employment/employment";
import {OtherPage} from "./page/other/other";
import {ReportPage} from "./page/report/report";
import {ModalWindow} from "./components/modal/Modal";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path: "student",
                element: <StudentPage/>,
            },
            {
                path: "employment",
                element: <EmploymentPage/>,
            },
            {
                path: "report",
                element: <ReportPage/>,
            },
            {
                path: "other",
                element: <OtherPage/>,
            },
        ]
    },
]);
function App() {


  return (
    <div className="App">
        <ModalWindow/>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
