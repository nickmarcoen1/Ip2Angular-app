import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/kandoe/dashboard/dashboard.component';
import {ThemesComponent} from './components/kandoe/themes/themes.component';
import {NewThemeComponent} from './components/kandoe/new-theme/new-theme.component';
import {AlertModule} from 'ngx-bootstrap';
import {ThemedetailOverviewComponent} from './components/kandoe/themedetail/components/themedetail-overview/themedetail-overview.component';
import {ThemedetailCardsComponent} from './components/kandoe/themedetail/components/themedetail-cards/themedetail-cards.component';
import {ThemedetailOrganiserComponent} from './components/kandoe/themedetail/components/themedetail-organiser/themedetail-organiser.component';
import {ThemedetailCategoriesComponent} from './components/kandoe/themedetail/components/themedetail-categories/themedetail-categories.component';
import {ThemedetailNavbarComponent} from './components/kandoe/themedetail/components/themedetail-navbar/themedetail-navbar.component';
import {HomeComponent} from './components/kandoe/home/home.component';
import {NavbarComponent} from './components/kandoe/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {KandoeComponent} from './components/kandoe/kandoe.component';
import {RegisterComponent} from './components/register/register.component';
import {ThemeService} from './services/theme.service';
import {RouterLinkDirectiveStub} from './testing/router-link-directive-stub';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import {Interceptor} from './interceptor';
import {TokenStorage} from './sessionStorage/token-storage';

import {CardEditComponent} from './components/kandoe/themedetail/components/themedetail-cards/card-edit/card-edit.component';
import {CardService} from './services/card.service';
import {CategoryService} from './services/category.service';
import {ThemedetailComponent} from './components/kandoe/themedetail/themedetail.component';
import {UseridStorage} from './sessionStorage/userid-storage';
import { NewSessionComponent } from './components/kandoe/new-session/new-session.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    ThemesComponent,
    NewThemeComponent,
    ThemedetailNavbarComponent,
    ThemedetailOverviewComponent,
    ThemedetailCardsComponent,
    ThemedetailOrganiserComponent,
    ThemedetailCategoriesComponent,
    LoginComponent,
    KandoeComponent,
    RegisterComponent,
    RouterLinkDirectiveStub,
    CardEditComponent,
    ThemedetailComponent,
    NewSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    AuthenticationService,
    ThemeService,
    CardService,
    CategoryService,
    Interceptor,
    UseridStorage
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
