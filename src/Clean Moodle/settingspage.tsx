import {
	render,
	h,
	Component,
	Fragment,
	createRef,
	RefObject,
	JSX,
} from 'preact';

import {
	getCourses_throwable,
	getToken,
	login_throwable,
	logout,
	getCredentials,
} from '../shared/moodle-functions-v2';
import {quickSort} from '../shared/general-functions';

import {removeElementFromStorage} from './shared';
import style from './settingspage.scss';

/** Sort courses, mutates the array */
const sortCoursesArray = (array: Course[]) =>
	quickSort(
		array,
		(
			{courseName: courseNameA, replacedName: replacedNameA},
			{courseName: courseNameB, replacedName: replacedNameB},
		) => {
			const lowerA = (replacedNameA ?? courseNameA).toLowerCase();
			const lowerB = (replacedNameB ?? courseNameB).toLowerCase();

			return lowerA < lowerB ? -1 : (lowerA > lowerB ? 1 : 0);
		},
	);

/**
 * Get the replaced name of a course or undefined
 */
const getReplacedCourseName = (id: string): string | undefined => {
	const replacers = GM_getValue<Record<string, string> | undefined>('replace');

	return replacers?.[id];
};

/**
 * Check if a course is being hidden
 */
const checkIsCourseRemoved = (id: string): boolean =>
	GM_getValue<string[] | undefined>('remove')?.includes(id) ?? false;

/**
 * Add item to removers
 */
const setRemoved = (id: string) => {
	const {removers} = removeElementFromStorage(id, {updateRemovers: false});

	removers.push(id);

	GM_setValue('remove', removers);
};

/**
 * Set the new text for a course
 */
const setReplaced = (
	id: string,
	newValue: string | undefined = '',
	oldValue: string | undefined = '',
) => {
	newValue = newValue.trim();
	oldValue = oldValue.trim();

	const {replacers} = removeElementFromStorage(id, {
		updateReplacers: false,
	});

	if (newValue !== '' && newValue !== oldValue) {
		replacers[id] = newValue;
	}

	GM_setValue('replace', replacers);
};

const SvgCheck = () => (
	<svg
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		class="icon svg-icon-check"
		viewBox="0 0 24 24"
	>
		<path d="m5 12 5 5L20 7"/>
	</svg>
);
const SvgX = () => (
	<svg
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		class="icon svg-icon-x"
		viewBox="0 0 24 24"
	>
		<path d="M18 6 6 18M6 6l12 12"/>
	</svg>
);
const SvgArrowBack = () => (
	<svg
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		class="icon svg-icon-arrow-back"
		viewBox="0 0 24 24"
	>
		<path d="m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1"/>
	</svg>
);
const SidebarRow = ({
	course,
	handleClick,
	toggleItem,
	resetItem,
}: {
	course: Course;
	handleClick: (
		event_: JSX.TargetedMouseEvent<HTMLDivElement>,
		item: Course
	) => void;
	toggleItem: (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course
	) => void;
	resetItem: (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course
	) => void;
}) => {
	const {courseName, replacedName, isRemoved} = course;
	return (
		<div
			class={`row${isRemoved ? ' removed' : ''}`}
			onClick={event_ => {
				handleClick(event_, course);
			}}
		>
			<span>
				<span
					onClick={event_ => {
						toggleItem(event_, course);
					}}
				>
					{isRemoved ? <SvgX/> : <SvgCheck/>}
				</span>
				{replacedName === undefined ? (
					courseName
				) : (
					<>
						{replacedName}
						<span
							onClick={event_ => {
								resetItem(event_, course);
							}}
						>
							<SvgArrowBack/>
						</span>
					</>
				)}
			</span>
		</div>
	);
};

const Sidebar = ({
	courses,
	loadingCourses,
	...rest
}: {
	courses: Course[];
	loadingCourses: boolean;
	handleClick: (
		event_: JSX.TargetedMouseEvent<HTMLDivElement>,
		item: Course
	) => void;
	toggleItem: (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course
	) => void;
	resetItem: (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course
	) => void;
}) => (
	<div class="outer-sidebar">
		<div class="sidebar">
			{loadingCourses && <div>Loading courses...</div>}
			{courses.map(course => (
				<SidebarRow key={course.courseId} course={course} {...rest}/>
			))}
		</div>
	</div>
);

const Main = (props: {
	selected: SettingsPageState['selected'];
	replaceInputRef: RefObject<HTMLInputElement>;
	handleKeydown: JSX.KeyboardEventHandler<HTMLInputElement>;
	handleSaveClick: JSX.MouseEventHandler<HTMLButtonElement>;
	loggedOutInputs: {
		username: RefObject<HTMLInputElement>;
		password: RefObject<HTMLInputElement>;
	};
	loggedOut: boolean;
	loggedOutCallback: () => void;
}) => {
	const {
		selected,
		replaceInputRef,
		handleSaveClick,
		handleKeydown,
		loggedOutInputs,
	} = props;

	return (
		<div class="outer-main">
			<div class="main">
				{props.loggedOut ? (
					<div class="replace-flex-input">
						<h5>Login</h5>
						<input ref={loggedOutInputs.username} placeholder="Username"/>
						<input
							ref={loggedOutInputs.password}
							placeholder="Password"
							type="password"
						/>
						<button
							class="btn-save"
							type="button"
							onClick={props.loggedOutCallback}
						>
							Login
						</button>
					</div>
				) : (
					<>
						<div class="section-title">Rename course</div>
						<div class="replace-flex-inputs">
							<div>
								{selected.isSelected
									? `Selected: ${selected.courseName}`
									: 'Select course to the left'}
							</div>
							<input
								ref={replaceInputRef}
								class="replace-input"
								placeholder="Select course to the left"
								disabled={!selected.isSelected}
								value={
									selected.isSelected
										? selected.replacedName ?? selected.courseName
										: ''
								}
								onKeyDown={handleKeydown}
							/>
							<button
								class="btn-save"
								disabled={!selected.isSelected}
								type="button"
								onClick={handleSaveClick}
							>
								Save
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

type Course = Readonly<{
	courseName: string;
	courseId: string;
	isRemoved: boolean;
	replacedName: string | undefined;
}>;

type SettingsPageState = {
	courses: Course[];
	loadingCourses: boolean;
	selected:
		| {
				isSelected: false;
		  }
		| ({
				isSelected: true;
		  } & Course);
	loggedOut: boolean;
};

class SettingsPage extends Component<
	Record<string, unknown>,
	SettingsPageState
> {
	state: SettingsPageState = {
		courses: [],
		loadingCourses: true,
		selected: {isSelected: false},
		loggedOut: false,
	};

	replaceInputRef = createRef<HTMLInputElement>();

	loggedOutInputs = {
		username: createRef<HTMLInputElement>(),
		password: createRef<HTMLInputElement>(),
	};

	callbacksOnLoggedIn = new Set<(token: string) => void>();

	constructor(...args: Array<Record<string, unknown>>) {
		super(...args);

		this.callbacksOnLoggedIn.add(this.setCourses);
	}

	render = () => {
		const {courses, selected, loggedOut, loadingCourses} = this.state;
		const {
			handleSidebarClick,
			toggleCourseRemoved: toggleItem,
			resetCourse: resetItem,
			replaceInputRef,
			loggedOutInputs,
			loggedOutCallbackHandler,
			handleMainKeydown,
			handleSave,
		} = this;

		return (
			<div class="container">
				<Sidebar
					courses={courses}
					handleClick={handleSidebarClick}
					toggleItem={toggleItem}
					resetItem={resetItem}
					loadingCourses={loadingCourses}
				/>
				<Main
					selected={selected}
					replaceInputRef={replaceInputRef}
					handleKeydown={handleMainKeydown}
					handleSaveClick={handleSave}
					loggedOut={loggedOut}
					loggedOutCallback={loggedOutCallbackHandler}
					loggedOutInputs={loggedOutInputs}
				/>
			</div>
		);
	};

	setCourses = async (token: string) => {
		let coursesObject: Record<string, string>;
		try {
			coursesObject = await getCourses_throwable(token);
		} catch {
			this.handleLogOut(false, this.setCourses);

			return;
		}

		const courses: Course[] = [];

		for (const [courseId, courseName] of Object.entries(coursesObject)) {
			courses.push({
				courseName,
				courseId,
				replacedName: getReplacedCourseName(courseId),
				isRemoved: checkIsCourseRemoved(courseId),
			});
		}

		sortCoursesArray(courses);

		this.setState({courses, loadingCourses: false});
	};

	loggedOutCallbackHandler = async () => {
		const username = this.loggedOutInputs.username.current?.value.trim();
		const password = this.loggedOutInputs.password.current?.value;

		if (username && password) {
			try {
				const token = await login_throwable({
					username,
					password,
				});

				this.setState({
					loggedOut: false,
				});

				this.callCallbacksOnLogIn(token);
			} catch {
				this.handleLogOut(true);
			}
		}
	};

	callCallbacksOnLogIn = (token: string) => {
		for (const cb of this.callbacksOnLoggedIn) {
			cb(token);

			this.callbacksOnLoggedIn.delete(cb);
		}
	};

	handleLogOut = (
		removeCredentials?: boolean,
		cb?: (token: string) => void,
	) => {
		logout(removeCredentials);

		if (cb) {
			this.callbacksOnLoggedIn.add(cb);
		}

		this.setState({
			loggedOut: true,
		});
	};

	getToken = async (): Promise<string | undefined> => {
		const token = getToken();

		if (token) {
			return token;
		}

		const creds = getCredentials();

		if (!creds) {
			this.handleLogOut(true);

			return undefined;
		}

		try {
			return await login_throwable(creds);
		} catch {
			this.handleLogOut(true);

			return undefined;
		}
	};

	componentDidMount = () => {
		void this.getToken().then(token => {
			if (token) {
				this.callCallbacksOnLogIn(token);
			}
		});
	};

	handleMainKeydown: JSX.KeyboardEventHandler<HTMLInputElement> = event_ => {
		if (event_.key === 'Enter') {
			this.handleSave();
		}
	};

	handleSave = () => {
		const input = this.replaceInputRef.current?.value;

		if (input === undefined) {
			return;
		}

		this.setState(({selected}): Pick<SettingsPageState, 'selected'> | null => {
			if (!selected.isSelected) {
				return null;
			}

			const {courseId, courseName} = selected;

			setReplaced(courseId, input, courseName);

			this.updateCourseById(courseId);

			return {selected: {isSelected: false}};
		});
	};

	toggleCourseRemoved = (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		{isRemoved, courseId}: Course,
	) => {
		event_.stopImmediatePropagation();
		if (isRemoved) {
			removeElementFromStorage(courseId);
		} else {
			setRemoved(courseId);
		}

		this.updateCourseById(courseId);

		this.removeSelectedIfEqualId(courseId);
	};

	resetCourse = (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course,
	) => {
		const {courseId} = item;
		event_.stopImmediatePropagation();
		this.removeSelectedIfEqualId(courseId);

		removeElementFromStorage(courseId);

		this.updateCourseById(courseId);
	};

	removeSelectedIfEqualId = (id: string) => {
		this.setState(({selected}): Pick<SettingsPageState, 'selected'> | null => {
			if (selected.isSelected && selected.courseId === id) {
				return {selected: {isSelected: false}};
			}

			return null;
		});
	};

	updateCourseById = (id: string) => {
		this.setState(({courses}): Pick<SettingsPageState, 'courses'> => {
			for (const [i, course] of courses.entries()) {
				if (course.courseId === id) {
					courses[i] = {
						...course,
						isRemoved: checkIsCourseRemoved(id),
						replacedName: getReplacedCourseName(id),
					};

					break;
				}
			}

			sortCoursesArray(courses);

			return {courses};
		});
	};

	handleSidebarClick = (
		_event: JSX.TargetedMouseEvent<HTMLDivElement>,
		course: Course,
	) => {
		if (course.isRemoved) {
			removeElementFromStorage(course.courseId, {updateReplacers: false});
			this.updateCourseById(course.courseId);
		}

		this.setState(
			{
				selected: {
					isSelected: true,
					...course,
				},
			},
			() => {
				const input = this.replaceInputRef.current;
				if (input) {
					input.focus();
					input.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'center',
					});
				}
			},
		);
	};
}

/**
 * Designed to run on the clean moodle settingspage
 * Sets up the settings by clearing the dom and rendering the settings
 */
export const setupSettingsPage = () => {
	const {head, body} = document;
	while (head.lastChild) {
		head.lastChild.remove();
	}

	while (body.lastChild) {
		body.lastChild.remove();
	}

	history.replaceState({}, '', '/cleanMoodlePreact');

	document.title = 'Clean Moodle Setup';

	GM_addStyle(style);

	render(<SettingsPage/>, body);

	const link = document.createElement('link');
	link.rel = 'shortcut icon';
	link.href = '/theme/image.php/classic/theme/1588340020/favicon';
	head.append(link);
};
