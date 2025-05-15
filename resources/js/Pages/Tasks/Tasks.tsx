import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import {Button, Chip, FormControl, ListItemButton, ListItemText, Typography,  Pagination} from "@mui/material";
import {useState} from "react";
import { usePage } from "@inertiajs/react";

export default function Tasks() {

    const { flash, tasks } = usePage().props;

    const handlePageChange = (event, value) => {

        console.log(event);
        console.log(value);

        router.get(route('tasks.index'), { page: value}, {
            preserveState: false,
            preserveScroll: false,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                        <div className="pl-6 pr-6 pt-6 text-gray-900">
                            {/* Display success message */}
                            {flash?.success && (
                                <>
                                    {flash.success}
                                    <Chip label="success" color="success" className={'ml-2'} />
                                </>
                            )}
                        </div>

                        <div className="p-6 text-gray-900">
                            <Link href={route("tasks.create")}>
                                <Button variant="contained">Add a Task</Button>
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900">
                            <Typography variant="h4" component="h1" gutterBottom>
                                List of tasks
                            </Typography>

                            <ul>
                                {tasks.data.map((task) => (
                                    <li key={task.id}>
                                        <ListItemButton>
                                            <ListItemText primary={task.title} />
                                        </ListItemButton>
                                    </li>
                                ))}
                            </ul>

                            <Pagination
                                count={tasks.last_page}
                                page={tasks.current_page}
                                onChange={handlePageChange}
                                color="primary"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
