import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import {Box, Button, FormControl, TextField, Container} from "@mui/material";


export default function CreateUpdateTask() {

	const { data, setData, post, processing, errors } = useForm({
		title: "",
		description: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		post(route("tasks.store"));
	};

	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Create Task
				</h2>
			}
		>
			<Head title="Create Task" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<Container className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<Box component="form" onSubmit={handleSubmit} noValidate>
							<TextField
								label="Title"
								variant="outlined"
								fullWidth
								margin="normal"
								value={data.title}
								onChange={(e) => setData("title", e.target.value)}
								error={!!errors.title}
								helperText={errors.title}
							/>
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
							/>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								disabled={processing}
							>
								Create Task
							</Button>
						</Box>
					</Container>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
