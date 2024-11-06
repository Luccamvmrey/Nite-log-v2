import React from "react";
import Schedule from "@/modules/common/models/Schedule.ts";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";

type DeleteScheduleContextMenuProps = {
    children: React.ReactNode;
    schedule: Schedule;
    onContextOpen: (schedule: Schedule) => void;
}

const DeleteScheduleContextMenu = ({children, schedule, onContextOpen}: DeleteScheduleContextMenuProps) => {
    const onOpen = () => onContextOpen(schedule);

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={onOpen}>
                    <span className="text-red-600">Apagar horário</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default DeleteScheduleContextMenu;