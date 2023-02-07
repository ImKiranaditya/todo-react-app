import React, { useState } from "react";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

const App = () => {
	const [input, setInput] = useState("");
	const [todo, setTodo] = useState([]);
	const [model, setModel] = useState(false);
	const [markToggle, setMarkToogle] = useState(false);

	const markCompleteHandler = (id, td) => {
		setMarkToogle(!markToggle);
		if (!markToggle) {
			document.getElementById(id).style.textDecoration = "line-through";
		} else {
			document.getElementById(id).style.textDecoration = "none";
		}
	};

	const addHandler = (input, index, editCheck) => {
		console.log("input", input);
		if (editCheck) {
			console.log("editCheck", editCheck);
			console.log("input", index);
			setInput(input);
			removeHandler(index);
			setModel(false);
		} else {
			if (input) {
				setModel(false);
				const newTodo = [...todo, input];
				console.log("newTodo", newTodo);
				setTodo(newTodo);
				setInput("");
			} else {
				setModel(true);
			}
		}
	};

	const removeHandler = (id) => {
		console.log("id", id);
		setModel(false);
		const newTd = todo.filter((td, index) => {
			return index !== id;
		});
		setTodo(newTd);
		console.log("td", newTd);
	};

	return (
		<>
			<section style={{ backgroundColor: "#eee" }}>
				<div className="container py-5">
					<div className="row d-flex justify-content-center align-items-center">
						<div className="col-md-6 col-xl-6 col-xs-12 text-center">
							<div className="card">
								<div className="card-header p-3">
									<h5 className="mb-0">
										<i className="fa fa-tasks me-2"></i>Task List
									</h5>
								</div>
								{model ? <Model /> : ""}
								<div className="container input-group mt-3">
									<input
										type="text"
										className="form-control"
										placeholder="Add Task"
										aria-label="addTask"
										aria-describedby="basic-addon2"
										value={input}
										onChange={(e) => {
											setInput(e.target.value);
										}}
									/>
									<div className="input-group-append">
										<button
											className="btn btn-outline-primary"
											type="submit"
											onClick={() => addHandler(input, "NAN", false)}>
											Save
										</button>
									</div>
								</div>
								<div
									className="card-body"
									data-mdb-perfect-scrollbar="true"
									style={{ position: "relative", height: "400px" }}>
									<table className="table mb-0">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Task</th>
												<th scope="col">Actions</th>
											</tr>
										</thead>
										<tbody>
											{todo.map((td, index) => {
												return (
													<tr className="fw-normal" key={index}>
														<td className="align-middle">
															<span>{index + 1}</span>
														</td>
														<td className="align-middle">
															<span id={index}>{td}</span>
														</td>
														<td className="align-middle">
															<i
																className="fa fa-edit text-primary"
																onDoubleClick={() =>
																	addHandler(td, index, true)
																}></i>
															<i
																className="fa fa-check-circle text-success"
																style={{ paddingLeft: "8px" }}
																onDoubleClick={() =>
																	markCompleteHandler(index, td)
																}></i>

															<i
																className="fa fa-trash text-danger"
																style={{ paddingLeft: "8px" }}
																onClick={() => removeHandler(index)}></i>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

const Model = () => {
	return (
		<div className="alert alert-danger" role="alert">
			Please fill the task input!!
		</div>
	);
};
export default App;
