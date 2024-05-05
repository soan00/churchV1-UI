import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrayerComponent } from './prayer/prayer.component';
import { DonetComponent } from './donet/donet.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {
        path: "home", component: HomeComponent
    },
    {
        path: "prayer", component: PrayerComponent
    },
    { path: "donet", component: DonetComponent },
    { path: "about", component: AboutComponent },
    { path: "", component: HomeComponent },
    { path: "**", component: HomeComponent }
];
