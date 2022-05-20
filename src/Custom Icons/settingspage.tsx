import {
	render,
	h,
	Component,
	Fragment,
	JSX,
	createRef,
	FunctionalComponent,
} from 'preact';
import {useEffect, useRef} from 'preact/hooks';
import {html} from 'htm/preact';

import {Moodle, getCourses, Courses} from '../shared/moodle-functions-v3';
import {numericBaseSensitiveCollator} from '../shared/general-functions';

import {
	deleteIconFromStorage,
	addEntry,
	copyEntry,
	getValueFromId,
} from './shared';
import style from './settingspage.scss';

Moodle.extend(getCourses);

const sortCourses = (courses: Course[]) => {
	courses.sort(({name: nameA, id: idA}, {name: nameB, id: idB}) => {
		nameA = nameA.trim();
		nameB = nameB.trim();

		// Sorting should be stable so if nameA === nameB the lower id should come first
		return (
			numericBaseSensitiveCollator.compare(nameA, nameB)
			|| Number(idB) - Number(idA)
		);
	});
};

type Icon = {
	dataURI?: string;
	rawXML?: string;
};

type Course = Readonly<{
	id: string;
	name: string;
	icon: Icon | undefined;
}>;

type SettingsPageState = {
	loggedOut: boolean;
	courses: Course[];
	selectedCourse: Course | undefined;
	isCoursesLoading: boolean;
	notification: string | undefined;
};

type MainState = {
	selected: FILE_TYPES;
};

type MainProps = {
	selectedCourse: SettingsPageState['selectedCourse'];
	courses: Course[];
	updateCourseById: (id: string) => void;
	resetSelected: () => void;
	notify: (notification: string) => void;
};

type SidebarProps = {
	courses: Course[];
	resetIcon: (id: string) => void;
	isCoursesLoading: boolean;
	selectCourse: (id: string) => void;
};

const enum FILE_TYPES {
	FILE,
	COPY,
	URL,
	NONE,
}

const enum ERROR_MSG {
	error = 'An error occured',
	timeout = 'Request timed out',
	abort = 'Request was aborted',
	invalidURL = 'Invalid URL submitted',
	notImage = 'File was not an image',
	noImage = 'You have not submitted an icon',
	noCourse = 'You have not selected a course',
	noExtractData = 'Could not extract data from data URI',
}

const errorMessageFromStatusCode = (status: number, statusText: string) =>
	`Error ${status}: ${statusText}`;

const SvgX: FunctionalComponent<
	{
		class?: string;
	} & JSX.DOMAttributes<SVGSVGElement>
> = ({class: _class, ...props}) => (
	<svg
		fill='none'
		stroke='currentColor'
		stroke-linecap='round'
		stroke-linejoin='round'
		stroke-width='2'
		class={`svg-icon svg-icon-x${_class ? ` ${_class}` : ''}`}
		viewBox='0 0 24 24'
		{...props}
	>
		<path d='M24 0 0 24M0 0l24 24' />
	</svg>
);

const RenderIcon = (props: {icon: Icon | undefined}) => {
	const {icon} = props;

	if (!icon) {
		return null;
	}

	return icon.rawXML ? (
		<span class='icon'>
			{html(
				Object.assign([icon.rawXML], {
					raw: [icon.rawXML],
				}),
			)}
		</span>
	) : (icon.dataURI ? (
		<img class='icon' src={icon.dataURI} />
	) : null);
};

const Notification: FunctionalComponent<{
	cb: () => void;
	content: string | undefined;
}> = ({content, cb}) => {
	const notificationRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (content !== undefined) {
			scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [content]);

	return content ? (
		<div
			class='outer-notification'
			onClick={event_ => {
				if (event_.currentTarget === event_.target) {
					cb();
				}
			}}
		>
			<div ref={notificationRef} class='inner-notification'>
				<SvgX
					class='svg-close'
					onClick={() => {
						cb();
					}}
				/>
				<div class='notification-string'>{content}</div>
			</div>
		</div>
	) : null;
};

const LoggedOut = (props: {
	cb: (creds: {username: string; password: string}) => void;
}) => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = event => {
		event.preventDefault();

		const username = usernameRef.current?.value.trim();
		const password = passwordRef.current?.value;

		if (username !== undefined && password !== undefined) {
			props.cb({
				username,
				password,
			});
		}
	};

	return (
		<div class='outer-main'>
			<div class='main'>
				<form onSubmit={handleSubmit}>
					<div class='replace-flex-inputs'>
						<h2>Login</h2>
						<input ref={usernameRef} placeholder='Username' />
						<input ref={passwordRef} placeholder='Password' type='password' />
						<button class='btn-save' type='submit'>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

class Main extends Component<MainProps, MainState> {
	override state: MainState = {
		selected: FILE_TYPES.NONE,
	};

	refs_ = {
		form: createRef<HTMLFormElement>(),
		url: createRef<HTMLInputElement>(),
		file: createRef<HTMLInputElement>(),
		copy: createRef<HTMLSelectElement>(),
	};

	render() {
		const {refs_, props, handleInput, resetForm: reset} = this;
		const {selected} = this.state;
		const {selectedCourse, courses} = props;
		const file = refs_.file.current?.files?.[0];

		return (
			<div class='outer-main'>
				<div class='main'>
					<form ref={refs_.form}>
						<h2>Change or add an icon</h2>
						{selectedCourse ? (
							<div
								ref={div => {
									div?.scrollIntoView({
										behavior: 'smooth',
										block: 'center',
									});
								}}
							>
								<RenderIcon icon={selectedCourse.icon} />
								<span>{selectedCourse.name}</span>
							</div>
						) : (
							<div>Select course to the left</div>
						)}
						<h3>Upload image from URL</h3>
						<input
							ref={refs_.url}
							type='url'
							placeholder='Image url'
							disabled={
								selected !== FILE_TYPES.URL && selected !== FILE_TYPES.NONE
							}
							onInput={event_ => {
								handleInput(FILE_TYPES.URL, event_);
							}}
						/>
						<h3>Upload image from file</h3>
						<input
							ref={refs_.file}
							hidden
							type='file'
							onInput={event_ => {
								handleInput(FILE_TYPES.FILE, event_);
							}}
						/>
						<button
							type='button'
							disabled={
								selected !== FILE_TYPES.FILE && selected !== FILE_TYPES.NONE
							}
							onClick={() => {
								refs_.file.current?.click();
							}}
						>
							{selected === FILE_TYPES.FILE && file ? (
								<>
									{file.name}
									<SvgX
										class='svg-clear'
										onClick={ev => {
											ev.stopPropagation();
											reset();
										}}
									/>
								</>
							) : (
								'Upload file'
							)}
						</button>
						<h3>Copy image from other course</h3>
						<select
							ref={refs_.copy}
							disabled={
								selected !== FILE_TYPES.COPY && selected !== FILE_TYPES.NONE
							}
							onInput={event_ => {
								handleInput(FILE_TYPES.COPY, event_);
							}}
						>
							<option selected value='null'>
								Select course to copy icon from
							</option>
							{courses.map(
								({id, icon, name}) =>
									icon
									&& id !== selectedCourse?.id && (
										<option key={id} value={id}>
											{name}
										</option>
									),
							)}
						</select>
						<button
							class='btn-save'
							type='button'
							disabled={
								selected === FILE_TYPES.NONE || selectedCourse === undefined
							}
							onClick={this.save}
						>
							Save
						</button>
					</form>
				</div>
			</div>
		);
	}

	resetForm = () => {
		this.refs_.form.current?.reset();

		this.setState({
			selected: FILE_TYPES.NONE,
		});
	};

	handleInput = (
		type: FILE_TYPES,
		event_:
			| JSX.TargetedEvent<HTMLSelectElement>
			| JSX.TargetedEvent<HTMLInputElement>,
	) => {
		let isActive = false;

		const target = event_.currentTarget;

		if (type === FILE_TYPES.COPY || type === FILE_TYPES.URL) {
			isActive = target.value !== '';
		} else if (type === FILE_TYPES.FILE && target instanceof HTMLInputElement) {
			isActive = target.files !== null && target.files.length > 0;
		}

		this.setState({
			selected: isActive ? type : FILE_TYPES.NONE,
		});
	};

	resetSelected = () => {
		this.props.resetSelected();

		this.resetForm();
	};

	save = () => {
		const {notify, selectedCourse: course} = this.props;

		if (course === undefined) {
			notify(ERROR_MSG.noCourse);

			return;
		}

		switch (this.state.selected) {
			case FILE_TYPES.NONE: {
				notify(ERROR_MSG.noImage);

				break;
			}

			case FILE_TYPES.COPY: {
				const value = this.refs_.copy.current?.value;

				if (value) {
					this.saveByCopy(value, course);
				} else {
					notify(ERROR_MSG.noImage);
				}

				break;
			}

			case FILE_TYPES.FILE: {
				const file = this.refs_.file.current?.files?.[0];

				if (file) {
					this.saveWithFileHandler(file, course);
				} else {
					notify(ERROR_MSG.noImage);
				}

				break;
			}

			case FILE_TYPES.URL: {
				const url = this.refs_.url.current?.value;

				if (url) {
					this.saveByURL(url, course);
				} else {
					notify(ERROR_MSG.invalidURL);
				}

				break;
			}

			default: {
				// Nothing
			}
		}
	};

	saveByURL = (value: string, course: Course) => {
		const {notify} = this.props;

		let url: URL;
		try {
			url = new URL(value);
		} catch {
			notify(ERROR_MSG.invalidURL);

			return;
		}

		GM_xmlhttpRequest<Blob>({
			method: 'GET',
			url: url.href,
			timeout: 15_000,
			responseType: 'blob',
			anonymous: true,
			onerror() {
				notify(ERROR_MSG.error);
			},
			ontimeout() {
				notify(ERROR_MSG.timeout);
			},
			onload: response => {
				if (response.status === 200 && response.response instanceof Blob) {
					this.saveWithFileHandler(response.response, course);
				} else {
					notify(
						errorMessageFromStatusCode(response.status, response.statusText),
					);
				}
			},
		});
	};

	saveWithFileHandler = (blob: Blob, course: Course) => {
		const {notify} = this.props;
		const {id} = course;

		const fr = new FileReader();

		fr.addEventListener('error', () => {
			notify(ERROR_MSG.error);
		});

		// Avoid unnecessary steps if svg
		// Read as text to not have to convert from base64
		if (blob.type === 'image/svg+xml') {
			fr.addEventListener('load', () => {
				// eslint-disable-next-line @typescript-eslint/ban-types
				const result = fr.result as string | null;

				if (typeof result !== 'string') {
					return;
				}

				addEntry(id, {
					rawXML: result,
				});

				this.props.updateCourseById(id);
				this.resetSelected();
			});

			fr.readAsText(blob);

			return;
		}

		fr.addEventListener('load', () => {
			// eslint-disable-next-line @typescript-eslint/ban-types
			const result = fr.result as string | null;

			if (typeof result !== 'string') {
				return;
			}

			const img = new Image();
			img.addEventListener('error', () => {
				notify(ERROR_MSG.notImage);
			});

			img.addEventListener('load', () => {
				const groups = /^data:[\w+/]+;base64,(?<data>.+)$/.exec(result)?.groups;

				if (!groups) {
					return;
				}

				const data = groups['data'];

				if (!data) {
					notify(ERROR_MSG.noExtractData);
					return;
				}

				addEntry(id, {
					dataURI: result,
				});

				this.props.updateCourseById(id);
				this.resetSelected();
			});

			img.src = result;
		});

		fr.readAsDataURL(blob);
	};

	saveByCopy = (courseId: string, course: Course) => {
		const {id} = course;

		copyEntry(id, courseId);

		this.resetSelected();
		this.props.updateCourseById(id);
	};
}

const Sidebar = ({
	courses,
	resetIcon,
	isCoursesLoading,
	selectCourse,
}: SidebarProps) => (
	<div class='outer-sidebar'>
		<div class='sidebar'>
			{isCoursesLoading ? (
				<div class='row'>Loading courses...</div>
			) : (
				courses.map(({id, name, icon}) => (
					<div
						key={id}
						class='row'
						onClick={() => {
							selectCourse(id);
						}}
					>
						<RenderIcon icon={icon} />
						{icon && (
							<SvgX
								class='svg-del-icon'
								onClick={event_ => {
									event_.stopPropagation();

									resetIcon(id);
								}}
							/>
						)}
						<span>{name}</span>
					</div>
				))
			)}
		</div>
	</div>
);

class SettingsPage extends Component<
	Record<string, unknown>,
	SettingsPageState
> {
	override state: SettingsPageState = {
		loggedOut: false,
		courses: [],
		selectedCourse: undefined,
		isCoursesLoading: true,
		notification: undefined,
	};

	moodle = new Moodle();

	render() {
		const {
			resetIcon,
			selectCourse,
			loggedOutCallback,
			updateCourseById,
			resetSelected,
			notify,
		} = this;
		const {loggedOut, selectedCourse, courses, isCoursesLoading, notification}
			= this.state;

		return (
			<>
				<Notification
					cb={() => {
						notify(undefined);
					}}
					content={notification}
				/>
				<div class={`container${notification === undefined ? '' : ' blur'}`}>
					<Sidebar
						courses={courses}
						resetIcon={resetIcon}
						isCoursesLoading={isCoursesLoading}
						selectCourse={selectCourse}
					/>
					{loggedOut ? (
						<LoggedOut cb={loggedOutCallback} />
					) : (
						<Main
							updateCourseById={updateCourseById}
							courses={courses}
							selectedCourse={selectedCourse}
							resetSelected={resetSelected}
							notify={notify}
						/>
					)}
				</div>
			</>
		);
	}

	override componentDidMount() {
		this.tryLogin();

		document.addEventListener('keydown', event_ => {
			if (event_.key === 'Escape') {
				this.notify(undefined);
			}
		});
	}

	notify = (notification: string | undefined) => {
		this.setState({
			notification,
		});
	};

	resetIcon = (id: string) => {
		deleteIconFromStorage(id);

		this.updateCourseById(id);

		this.resetSelectedIfEqualId(id);
	};

	selectCourse = (id: string) => {
		for (const course of this.state.courses) {
			if (course.id === id) {
				this.setState({
					selectedCourse: {...course},
				});

				break;
			}
		}
	};

	loggedOutCallback = (creds: {username: string; password: string}) => {
		this.setState({
			loggedOut: false,
		});

		this.tryLogin(creds);
	};

	tryLogin = (creds?: {username: string; password: string}) => {
		this.moodle.login(creds).then(this.onLogin, this.logout);
	};

	updateCourseById = (id: string) => {
		const icon = getValueFromId(id);

		this.setState(({courses}): Pick<SettingsPageState, 'courses'> => {
			const updatedCourses = [...courses];

			for (const [i, course] of courses.entries()) {
				if (course.id === id) {
					updatedCourses[i] = {
						...course,
						icon,
					};

					break;
				}
			}

			return {
				courses: updatedCourses,
			};
		});
	};

	resetSelected = () => {
		this.setState({
			selectedCourse: undefined,
		});
	};

	resetSelectedIfEqualId = (id: string) => {
		if (this.state.selectedCourse?.id === id) {
			this.resetSelected();
		}
	};

	logout = () => {
		this.moodle.logout();

		this.setState({
			loggedOut: true,
		});
	};

	onLogin = async () => {
		await this.getCourses();
	};

	getCourses = async () => {
		let coursesObject: Courses;

		try {
			coursesObject = await this.moodle.getCourses();
		} catch {
			this.logout();

			return;
		}

		const courses: Course[] = [];
		for (const {id, name} of coursesObject) {
			courses.push({
				id: String(id),
				name,
				icon: getValueFromId(String(id)),
			});
		}

		sortCourses(courses);

		this.setState({
			courses,
			isCoursesLoading: false,
		});
	};
}

export const setupSettingsPage = () => {
	if (location.protocol !== 'https:') {
		location.protocol = 'https:';
	}

	const {body, head} = document;
	while (body.lastChild) {
		body.lastChild.remove();
	}

	while (head.lastChild) {
		head.lastChild.remove();
	}

	const icon = document.createElement('link');
	icon.rel = 'shortcut icon';
	icon.href = '/theme/image.php/classic/theme/1606210545/favicon';
	head.append(icon);

	document.title = 'Custom Icons Setup';

	history.replaceState({}, '', '/customIconsPreact');

	GM_addStyle(style);

	render(<SettingsPage />, body);
};
