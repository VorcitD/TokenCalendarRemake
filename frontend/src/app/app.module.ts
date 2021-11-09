import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { EventsComponent } from './pages/events/events.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
// import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule
    // routing
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
