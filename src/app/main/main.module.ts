import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { UsersModule } from "../users/users.module";
import { NoTaskComponent } from "../tasks/no-task/no-task.component";
import { UnauthorizedComponent } from "../unauthorized/unauthorized.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { MainRoutingModule } from "./main-routing.module";


@NgModule({
    declarations: [MainComponent, NoTaskComponent, UnauthorizedComponent, NotFoundComponent],
    imports: [UsersModule, MainRoutingModule],

})
export class MainModule {

}