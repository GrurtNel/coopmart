import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { SettingComponent } from './setting/setting.component';
import { HostComponent } from './host/host.component';
import { PreviewComponent } from './question/preview/preview.component';
import { EntryScreenComponent } from './question/entry-screen/entry-screen.component';


const routes: Routes = [
    { path: 'setting', component: SettingComponent },
    { path: 'host', component: HostComponent },
    { path: 'preview', component: PreviewComponent },
    { path: 'welcome', component: EntryScreenComponent },
    { path: '', component: QuestionComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
