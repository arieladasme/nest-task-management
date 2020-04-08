import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`)
        }

        return value;
    }

    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status); // indexOf: retorna el primer índice en el que se puede encontrar un elemento dado en el array, ó retorna -1 si el elemento no esta presente
        return idx !== -1;
    }
}