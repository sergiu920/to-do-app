import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import {Head, Link, router, usePage, useForm} from '@inertiajs/react';
import {Button, Alert, List, ListItem, ListItemText, Typography,  Pagination, IconButton} from '@mui/material';
import {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Tasks() {

    const { flash, tasks } = usePage().props;

    const {
        processing,
        delete: destroy,
    } = useForm();

    const [confirmingTaskDeletion, setConfirmingTaskDeletion] = useState(false);
    const [deleteTaskData, setDeleteTaskData] = useState(null);

    const handlePageChange = (event, value) => {
        router.get(route('tasks.index'), { page: value}, {
            preserveState: false,
            preserveScroll: false,
        });
    }

    const openConfirmModal = (task) => {
        setConfirmingTaskDeletion(true);
        setDeleteTaskData(task);
    }

    const closeConfirmModal = () => {
        setConfirmingTaskDeletion(false);
    }

    const deleteTask: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('tasks.destroy', deleteTaskData.id), {
            preserveScroll: true,
            onSuccess: () => setConfirmingTaskDeletion(false),
            onFinish: () => setDeleteTaskData(null)
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                        <div className="flex justify-between items-start pl-6 pr-6 pt-6 text-gray-900 flex">
                            <div>
                                <Typography variant="h4" gutterBottom>
                                    List of tasks
                                </Typography>

                            </div>
                            <div className="text-right">
                                <Link href={route("tasks.create")}>
                                    <Button variant="contained">Add a Task</Button>
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 text-gray-900">

                            <div>
                                {flash.success && (
                                    <Alert severity="success">
                                        {flash.success}
                                    </Alert>
                                )}

                                {flash.error && (
                                    <Alert severity="error">
                                        {flash.error}
                                    </Alert>
                                )}
                            </div>

                            <List>
                                {tasks.data.map((task) => (
                                    <ListItem
                                        key={task.id}
                                        secondaryAction={
                                            <>
                                                <Link href={route('tasks.edit', task.id)}>
                                                    <IconButton
                                                        aria-label="edit"
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => openConfirmModal(task)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        }
                                    >
                                        <ListItemText primary={`${task.id}. ${task.title}`} />
                                    </ListItem>
                                ))}
                            </List>

                            <div className="flex justify-end">
                                <Pagination
                                    count={tasks.last_page}
                                    page={tasks.current_page}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </div>

                            {deleteTaskData && (
                                <Modal show={confirmingTaskDeletion} onClose={closeConfirmModal}>
                                    <form onSubmit={deleteTask} className="p-6">
                                        <Typography variant="h5" gutterBottom>
                                            Are you sure that you want to delete this task?
                                        </Typography>
                                        <Typography variant="p">
                                            {deleteTaskData.id}. {deleteTaskData.title}
                                        </Typography>
                                        <div className="mt-6 flex justify-end">
                                            <SecondaryButton onClick={closeConfirmModal}>
                                                Cancel
                                            </SecondaryButton>
                                            <DangerButton className="ms-3" disabled={processing}>
                                                Delete Task
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
