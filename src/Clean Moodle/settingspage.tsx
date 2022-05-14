import {
	render,
	h,
	Component,
	createRef,
	RefObject,
	JSX,
	FunctionalComponent,
} from 'preact';

import {useRef} from 'preact/hooks';
import {
	Moodle,
	getCourses,
	Courses,
	getUsername,
} from '../shared/moodle-functions-v3';
import {numericBaseSensitiveCollator} from '../shared/general-functions';

import {getOverrides, getValue, removeElementFromStorage} from './shared';
import style from './settingspage.scss';
import {SvgArrowBack, SvgCheck, SvgX} from './icons';

Moodle.extend(getCourses);

/** Sort courses, mutates the array */
const sortCoursesArray = (array: Course[]) =>
	array.sort(
		(
			{courseName: courseNameA, value: valueA},
			{courseName: courseNameB, value: valueB},
		) => {
			const textA = getName(valueA, courseNameA).trim();
			const textB = getName(valueB, courseNameB).trim();

			return numericBaseSensitiveCollator.compare(textA, textB);
		},
	);

const getName = (name: string | undefined | false, defaultName: string) =>
	typeof name === 'string' ? name : defaultName;

/**
 * Add item to removers
 */
const setRemoved = (id: number) => {
	const overrides = getOverrides();

	overrides[id] = false;

	GM_setValue('overrides', overrides);
};

/**
 * Set the new text for a course
 */
const setReplaced = (
	id: number,
	newValue: string | undefined = '',
	oldValue: string | undefined = '',
) => {
	newValue = newValue.trim();
	oldValue = oldValue.trim();

	const overrides = getOverrides();
	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	delete overrides[id];

	if (newValue !== '' && newValue !== oldValue) {
		overrides[id] = newValue;
	}

	GM_setValue('overrides', overrides);
};

const SidebarRow: FunctionalComponent<{
	course: Course;
	handleClick: (
		event_: JSX.TargetedMouseEvent<HTMLDivElement>,
		item: Course,
	) => void;
	toggleItem: (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course,
	) => void;
	resetItem: (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course,
	) => void;
}> = ({course, handleClick, toggleItem, resetItem}) => {
	const {courseName, value} = course;
	return (
		<div
			class={`row${value === false ? ' removed' : ''}`}
			title={courseName}
			onClick={event_ => {
				handleClick(event_, course);
			}}
		>
			<span
				onClick={event_ => {
					toggleItem(event_, course);
				}}
			>
				{value === false ? <SvgX /> : <SvgCheck />}
			</span>
			{getName(value, courseName)}
			{typeof value === 'string' && (
				<span
					onClick={event_ => {
						resetItem(event_, course);
					}}
				>
					<SvgArrowBack />
				</span>
			)}
		</div>
	);
};

const Sidebar: FunctionalComponent<{
	courses: Course[];
	loadingCourses: boolean;
	handleClick: (
		event_: JSX.TargetedMouseEvent<HTMLDivElement>,
		item: Course,
	) => void;
	toggleItem: (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course,
	) => void;
	resetItem: (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		item: Course,
	) => void;
}> = ({courses, loadingCourses, ...rest}) => (
	<div class="outer-sidebar">
		<div class="sidebar">
			{loadingCourses && <div>Loading courses...</div>}
			{courses.map(course => (
				<SidebarRow key={course.courseId} course={course} {...rest} />
			))}
		</div>
	</div>
);

const LoggedOut: FunctionalComponent<{
	cb: (username: string, password: string) => void;
}> = ({cb}) => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const onSubmit: JSX.GenericEventHandler<HTMLFormElement> = event => {
		event.preventDefault();

		const username = usernameRef.current?.value;
		const password = passwordRef.current?.value;

		if (username && password) {
			cb(username, password);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<div class="replace-flex-input">
				<h5>Login</h5>
				<input
					ref={usernameRef}
					placeholder="Username"
					defaultValue={getUsername()}
				/>
				<input ref={passwordRef} placeholder="Password" type="password" />
				<button class="btn-save" type="submit">
					Login
				</button>
			</div>
		</form>
	);
};

const Main = (props: {
	selected: SettingsPageState['selected'];
	replaceInputRef: RefObject<HTMLInputElement>;
	handleKeydown: JSX.KeyboardEventHandler<HTMLInputElement>;
	handleSaveClick: JSX.MouseEventHandler<HTMLButtonElement>;
}) => {
	const {selected, replaceInputRef, handleSaveClick, handleKeydown} = props;

	return (
		<div class="outer-main">
			<div class="main">
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
						placeholder={
							selected.isSelected
								? `Leave empty to reset to ${selected.courseName}`
								: 'Select course to the left'
						}
						disabled={!selected.isSelected}
						value={
							// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
							selected.isSelected ? selected.value || selected.courseName : ''
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
			</div>
		</div>
	);
};

type Course = Readonly<{
	courseName: string;
	courseId: number;
	value: string | false | undefined;
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
	moodle = new Moodle();

	override state: SettingsPageState = {
		courses: [],
		loadingCourses: true,
		selected: {isSelected: false},
		loggedOut: false,
	};

	replaceInputRef = createRef<HTMLInputElement>();

	render() {
		const {courses, selected, loggedOut, loadingCourses} = this.state;
		const {
			handleSidebarClick,
			toggleCourseRemoved: toggleItem,
			resetCourse: resetItem,
			replaceInputRef,
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
				{loggedOut ? (
					<LoggedOut cb={loggedOutCallbackHandler} />
				) : (
					<Main
						selected={selected}
						replaceInputRef={replaceInputRef}
						handleKeydown={handleMainKeydown}
						handleSaveClick={handleSave}
					/>
				)}
			</div>
		);
	}

	getCourses = async () => {
		let courses: Courses;
		try {
			courses = await this.moodle.getCourses();
		} catch {
			this.logout();

			return;
		}

		const coursesExtended: Course[] = [];

		for (const {id, name} of courses) {
			coursesExtended.push({
				courseName: name,
				courseId: id,
				value: getValue(id),
			});
		}

		sortCoursesArray(coursesExtended);

		this.setState({courses: coursesExtended, loadingCourses: false});
	};

	loggedOutCallbackHandler = async (username: string, password: string) => {
		username = username.trim();

		if (username && password) {
			try {
				await this.moodle.login({username, password});

				this.setState({
					loggedOut: false,
				});

				void this.onLogin();
			} catch {
				this.logout();
			}
		}
	};

	onLogin = async () => {
		await this.getCourses();
	};

	logout = () => {
		this.moodle.logout();

		this.setState({
			loggedOut: true,
		});
	};

	override componentDidMount() {
		this.moodle.login().then(this.onLogin, () => {
			this.logout();
		});
	}

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

		const selected = this.state.selected;
		if (!selected.isSelected) {
			return;
		}

		const {courseId, courseName} = selected;

		setReplaced(courseId, input, courseName);

		this.updateCourseById(courseId);

		this.setState({selected: {isSelected: false}});
	};

	toggleCourseRemoved = (
		event_: JSX.TargetedMouseEvent<HTMLSpanElement>,
		{value, courseId}: Course,
	) => {
		event_.stopImmediatePropagation();

		if (value === false) {
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

	removeSelectedIfEqualId = (id: number) => {
		this.setState(
			// eslint-disable-next-line @typescript-eslint/ban-types
			({selected}): Pick<SettingsPageState, 'selected'> | null => {
				if (selected.isSelected && selected.courseId === id) {
					return {selected: {isSelected: false}};
				}

				return null;
			},
		);
	};

	updateCourseById = (id: number) => {
		this.setState(({courses}): Pick<SettingsPageState, 'courses'> => {
			for (const [i, course] of courses.entries()) {
				if (course.courseId === id) {
					courses[i] = {
						...course,
						value: getValue(id),
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
		if (course.value === false) {
			removeElementFromStorage(course.courseId);
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

	render(<SettingsPage />, body);

	const link = document.createElement('link');
	link.rel = 'shortcut icon';
	link.href = '/theme/image.php/classic/theme/1588340020/favicon';
	head.append(link);
};
