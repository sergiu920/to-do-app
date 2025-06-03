import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm, usePage} from "@inertiajs/react";
import {Box, Button, Alert, TextField, Container} from "@mui/material";
import React, {useEffect} from "react";

type Task = {
    id: number,
    title: string,
    description: string
}

type Props = {
    task?: Task // optional, because for "create" it can be undefined
}

export default function CreateUpdateTask({ task }: Props) {

    const {flash} = usePage().props;

    const { data, setData, post, put, processing, errors } = useForm({
        title: task?.title ?? '',
        description: task?.description ?? '',
    });

    useEffect(() => {
        if(task) {
            setData({
                title: task.title,
                description: task.description
            })
        }
    }, [task])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(task) {
            put(route('tasks.update', task.id));
        } else {
            post(route('tasks.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {task ? 'Update the Task' : 'Create Task'}
                </h2>
            }
        >
            <Head title={task ? 'Update the Task' : 'Create Task'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Container className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className='mt-3'>
                            {flash.error && (
                                <Alert severity='error'>
                                    {flash.error}
                                </Alert>
                            )}
                            {flash.success && (
                                <Alert severity='success'>
                                    {flash.success}
                                </Alert>
                            )}
                        </div>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <div>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={processing}
                            >
                                {
                                    processing
                                        ? task
                                            ? 'Updating...'
                                            : 'Creating...'
                                        : task
                                            ? 'Update task'
                                            : 'Create task'
                                }
                            </Button>
                        </Box>
                    </Container>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
