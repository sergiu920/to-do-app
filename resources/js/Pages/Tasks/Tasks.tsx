import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import {Head, Link, router, usePage, useForm} from '@inertiajs/react';
import {Button, Alert, List, ListItem, ListItemText, Typography,  Pagination, IconButton, Tabs, Tab, Box, TextField} from '@mui/material';
import {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmListModal from '@/MUIComponents/ConfirmModal';

export default function Tasks() {

    const { flash, tasks, task_lists } = usePage().props;

    const {
        processing,
        delete: destroy,
    } = useForm();

    const [confirmingTaskDeletion, setConfirmingTaskDeletion] = useState(false);
    const [deleteTaskData, setDeleteTaskData] = useState(null);
    const [isModalAddListActive, setIsModalAddListActive] = useState(false);
    const [tabValue, setTabValue] = useState(0);

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

    // ============================ Start Tabs ============================
    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const CustomTabPanel = (props: TabPanelProps) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    const handleAddTab = () => {
        // Display Modal - input name of the list
        setIsModalAddListActive(true);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleConfirmAddList = (listName) => {

        router.post(route('task-lists.store'), {title: listName}, {
            onSuccess: () => {
                console.log('SUCCESS')
            },
            onError: (errors) => {
                console.error(errors)
            }
        });
    }

    // ============================ End Tabs ============================

    return (
        <AuthenticatedLayout>
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    aria-label="basic tabs example"
                                    sx={{ flexGrow: 1 }}
                                >
                                    {task_lists.map((list) => (
                                        <Tab key={list.id} label={list.title} {...a11yProps(list.id)} />
                                    ))}
                                </Tabs>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddTab}
                                    sx={{ ml: 2 }}
                                >
                                    Create new list
                                </Button>
                            </Box>
                            {task_lists.length > 0 &&
                                task_lists.map((list, index) => (
                                    <CustomTabPanel key={index} value={tabValue} index={index}>
                                        {/* list.tasks */}
                                        Item One {tabValue}
                                    </CustomTabPanel>
                                ))
                            }
                            <ConfirmListModal
                                open={isModalAddListActive}
                                onClose={() => setIsModalAddListActive(false)}
                                onConfirm={handleConfirmAddList}
                            />
                        </div>

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
