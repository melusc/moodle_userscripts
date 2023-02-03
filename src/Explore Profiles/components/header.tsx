import {unix} from 'dayjs';
import type {FunctionalComponent, VNode} from 'preact';
// eslint-disable-next-line n/file-extension-in-import
import {createPortal} from 'preact/compat';

import type {LoadedState} from '../types.js';
import {clearNode} from '../utils.js';

const Portal: FunctionalComponent<{children: VNode}> = ({children}) => {
	const pageHeader = document.querySelector('#page-header');

	if (pageHeader) {
		clearNode(pageHeader);
		return createPortal(children, pageHeader);
	}

	return null;
};

export const Header: FunctionalComponent<LoadedState> = ({
	id,
	image,
	fullname,
	firstaccess,
	lastaccess,
	isContact,
	isUserProfile,
	userId,
}) => (
	<Portal>
		<div class='col-12 pt-3 pb-3'>
			<div class='card '>
				<div class='card-body '>
					<div class='d-flex align-items-center'>
						<div class='mr-auto'>
							<div class='page-context-header'>
								<div class='page-header-image'>
									<a
										href={`/user/profile.php?id=${id}`}
										class='d-inline-block aabtn'
									>
										<img
											src={image}
											class='userpicture defaultuserpic'
											alt={`Picture of ${fullname}`}
											title={`Picture of ${fullname}`}
											width='100'
											height='100'
										/>
									</a>
								</div>
								<div class='page-header-headings'>
									<h1>{fullname}</h1>
									<h5>
										{'First accessed Moodle: '}
										<span class='epr-coloured'>
											{unix(firstaccess).format('ddd, D MMM YYYY HH:mm:ss')}
										</span>
									</h5>
									<h5>
										{'Last accessed Moodle '}
										<span class='epr-coloured'>
											{unix(lastaccess).fromNow(true)}
										</span>
										{' ago'}
									</h5>
								</div>
								<div class='btn-group header-button-group'>
									<a
										id='message-user-button'
										role='button'
										data-conversationid='0'
										data-userid={id}
										class='btn'
										href={`/message/index.php?id=${id}`}
									>
										<span>
											<i
												class='icon fa fa-comment fa-fw iconsmall'
												title='Message'
												aria-label='Message'
											/>
											<span class='header-button-title'>Message</span>
										</span>
									</a>
									<span
										class='sr-only sr-only-focusable'
										data-region='jumpto'
										tabIndex={-1}
									/>

									{!isUserProfile && (
										<a
											data-userid={id}
											data-is-contact={isContact ? 1 : 0}
											id='toggle-contact-button'
											role='button'
											class='ajax-contact-button btn'
											href={`/message/index.php?user1=${userId}&user2=${id}&${
												isContact ? 'removecontact' : 'addcontact'
											}=${id}&sesskey=${unsafeWindow.M.cfg.sesskey}`}
										>
											<span>
												{isContact ? (
													<i
														class='icon fa fa-user-times fa-fw iconsmall'
														title='Remove from contacts'
														aria-label='Remove from contacts'
													/>
												) : (
													<i
														class='icon fa fa-address-card fa-fw iconsmall'
														title='Add to contacts'
														aria-label='Add to contacts'
													/>
												)}
												<span class='header-button-title'>
													{isContact
														? 'Remove from contacts'
														: 'Add to contacts'}
												</span>
											</span>
											<span class='loading-icon icon-no-margin'>
												<i
													class='icon fa fa-circle-o-notch fa-spin fa-fw '
													title='Loading'
													aria-label='Loading'
												/>
											</span>
										</a>
									)}
								</div>
							</div>
						</div>
						<div
							class='header-actions-container flex-shrink-0'
							data-region='header-actions-container'
						/>
					</div>
					<div class='d-flex flex-wrap'>
						<div id='page-navbar'>
							<nav aria-label='Navigation bar'>
								<ol class='breadcrumb'>
									<li class='breadcrumb-item'>
										<a href='/'>Home</a>
									</li>

									<li class='breadcrumb-item'>Users</li>

									<li class='breadcrumb-item'>
										<a href={`/user/profile.php?id=${id}`} aria-current='page'>
											{fullname}
										</a>
									</li>
								</ol>
							</nav>
						</div>
						<div class='ml-auto d-flex'>
							{isUserProfile && (
								<>
									<div class='singlebutton'>
										<form method='post' action='/user/profile.php'>
											<input type='hidden' name='edit' value='1' />
											<input type='hidden' name='reset' value='1' />
											<input type='hidden' name='id' value={userId} />
											<input
												type='hidden'
												name='sesskey'
												value={unsafeWindow.M.cfg.sesskey}
											/>
											<button
												type='submit'
												class='btn btn-secondary'
												id='single_button5fcba57352eb71'
												title=''
											>
												Reset page to default
											</button>
										</form>
									</div>
									<div class='singlebutton'>
										<form method='post' action='/user/profile.php'>
											<input type='hidden' name='edit' value='1' />
											<input type='hidden' name='id' value={userId} />
											<input
												type='hidden'
												name='sesskey'
												value={unsafeWindow.M.cfg.sesskey}
											/>
											<button
												type='submit'
												class='btn btn-secondary'
												id='single_button5fcba57352eb72'
												title=''
											>
												Customise this page
											</button>
										</form>
									</div>
								</>
							)}
						</div>
						<div id='course-header' />
					</div>
				</div>
			</div>
		</div>
	</Portal>
);
