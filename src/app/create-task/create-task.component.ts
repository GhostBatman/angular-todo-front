import {Component, OnInit, Input} from '@angular/core';
import {TaskService} from '../task.service';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.css'],
    providers: [TaskService],
})
export class CreateTaskComponent implements OnInit {

    @Input('tasks') tasks: any;
    @Input('currentTaskList') currentTaskList: any;
    title: any;
    newTaskText: string;
    taskLists: any;

    constructor(private taskListService: TaskService) {
    }

    ngOnInit() {
    }

    public createNewTask() {
        if (this.newTaskText) {
            let task = {
                task_text: this.newTaskText,
                is_checked: 0,
                task_list_id: this.currentTaskList.id
            };
            this.newTaskText = '';

            this.currentTaskList.countTasks++;
            this.taskListService.createTask(task, this.currentTaskList.id)
                .subscribe(data => {
                    this.tasks.push(data.json()[0]);
                });
        }
    };

}
