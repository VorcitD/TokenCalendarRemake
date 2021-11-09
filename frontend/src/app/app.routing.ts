import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventsComponent } from "./pages/events/events.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";

const Routes: Routes =[
    {path:'Events',component:EventsComponent},
    {path:'SignUp',component:SignUpComponent},
    {path:'',component:LoginComponent}
];

export const routing:ModuleWithProviders<RouterModule> = RouterModule.forRoot(Routes);