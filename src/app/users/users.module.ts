import { NgModule } from "@angular/core";
import { UserComponent } from "./user/user.component";
import { UsersComponent } from "./users.component";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [UserComponent, UsersComponent],
    imports: [RouterModule],
    exports: [UsersComponent],
    providers: [],
    bootstrap: []
})
export class UsersModule { }