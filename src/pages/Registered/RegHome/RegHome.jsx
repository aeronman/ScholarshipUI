import React from "react"

import RegSideBar from "../common/regsidebar/RegSidebar"
import RegProfile from "../common/regprofile/regprofile"
import RegTotalScholars from "./components/RegTotalScholars/RegTotalScholars"
import RegTotalApplicants from "./components/RegTotalApplicants/RegTotalApplicants"
import RegMission from "./components/RegMission/RegMission"
import RegLineChart from "./RegLineChart/RegLineChart"
import VideoCallButton from "./components/VideoCallButton/VideoCallButton"
import ChatbotButton from "../../../components/PageWithChatbot";

import "./RegHome.css"
import "../common/allReg.css"

export default function RegHome() {
    return (
        <div className="RegHomeDiv1 ">
            <div className="RegHomeDiv1-1 ">
                <RegSideBar />
            </div>
            <div className="RegHomeDiv1-2 ">
                <div className="RegHomeDiv1-2-1">
                    <RegProfile />
                </div>
                <div className="RegHomeDiv1-2-2 ">
                    <div className="RegHomeDiv1-2-2-1 ">
                        <div className="RegHomeDiv1-2-2-1-1">
                            <RegTotalScholars />
                        </div>
                        <div className="RegHomeDiv1-2-2-1-1">
                            <RegTotalApplicants />
                        </div>
                    </div>
                    <div className="RegHomeDiv1-2-2-2">
                        <RegMission />
                    </div>
                </div>
                <div className="RegHomeDiv1-2-3 ">
                    <RegLineChart />
                </div>
                <VideoCallButton />
                <ChatbotButton />
            </div>
        </div>
    )
}