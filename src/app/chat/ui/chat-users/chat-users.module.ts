import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChatUsersComponent } from "./chat-users.component";

@NgModule({
    declarations: [ChatUsersComponent],
    imports: [CommonModule],
    exports: [ChatUsersComponent]
})
export class ChatUsersModule {}