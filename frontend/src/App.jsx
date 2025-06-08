import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { LogIn } from "./components/LogIn";
import { Component } from "react/cjs/react.production.min";
import { ProfileUser } from "./components/ProfileUser";
import { Video } from "./components/Video"
import { VideoSelect } from "./components/VideoSelect"
import { SingIn } from "./components/SingIn";
import { DeportistaList } from "./components/DeportistaList";
import { Tourney } from "./components/Torneo";
import { EditProfile } from "./components/EditProfile";
import {EditTourney} from "./components/EditTourney";
import { FusionCategories } from "./components/FusionCategories";
import { Athlete } from "./components/Athlete"
import { Category } from "./components/Category";
import { HelpTourney } from "./components/HelpTourney";
import { InitializedCategory } from "./components/InitializedCategory";
import { VerifyCom } from "./components/VerifyCom";
//Teisel Rivera
export class App extends Component
{
    render()
    {
        return(
            <Fragment>
                    <Router>
                        <Routes>
                            <Route exact path="/" element = {<Inicio/>}/>
                            <Route exact path="/LogIn" element = {<LogIn/>}/>
                            <Route exact path="/Profile" element = {<ProfileUser/>}/>
                            <Route exact path="/Video" element = {<Video/>}/>
                            <Route exact path="/VideoSelect" element = {<VideoSelect/>}/>
                            <Route exact path="/SingIn" element = {<SingIn/>}/>
                            <Route exact path="/AthleteList" element = {<DeportistaList/>}/>
                            <Route exact path="/FinishTourney" element = {<Tourney/>}/>
                            <Route exact path="/EditProfile" element = {<EditProfile/>}/>
                            <Route exact path="/EditTourney" element = {<EditTourney/>}/>
                            <Route exact path="/FusionCategories" element = {<FusionCategories/>}/>
                            <Route exact path="/Athlete" element = {<Athlete/>}/>
                            <Route exact path="/Category" element = {<Category/>}/>
                            <Route exact path="/HelpTourney" element = {<HelpTourney/>}/>
                            <Route exact path="/InitializedCategory" element = {<InitializedCategory/>}/>
                            <Route exact path="/VerifyCompetitors" element = {<VerifyCom/>}/>
                        </Routes>
                    </Router>
            </Fragment>
            
        )
    }

}
