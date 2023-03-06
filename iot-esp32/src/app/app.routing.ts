import { Route } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppResolver } from "./app.resolver";

export const appRoutes: Route[] = [
    {
        path     : '',
        component: AppComponent,
        resolve : {
            tasks : AppResolver
        }
    }
]