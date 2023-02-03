import {unix} from 'dayjs';
import {sanitize} from 'dompurify';
import type {FunctionalComponent, VNode} from 'preact';
// eslint-disable-next-line n/file-extension-in-import
import {createPortal} from 'preact/compat';

import type {LoadedState} from '../types.js';
import {clearNode, isReadonlyArray} from '../utils.js';
import {CustomField} from './custom-field.js';

const Portal: FunctionalComponent<{children: VNode}> = ({children}) => {
	const regionMainBox = document.querySelector('#region-main-box');

	clearNode(regionMainBox);

	return regionMainBox ? createPortal(children, regionMainBox) : null;
};

export const Main: FunctionalComponent<LoadedState> = ({
	description,
	email,
	country,
	city,
	customfields,
	interests,
	courses,
	id,
	firstaccess,
	lastaccess,
	isUserProfile,
	userId,
}) => (
	<Portal>
		<section id='region-main' class='region-main-content' aria-label='Content'>
			<span class='notifications' id='user-notifications' />
			<div role='main'>
				<span id='maincontent' />
				<div class='userprofile'>
					{typeof description !== 'undefined' && description !== '' && (
						<div
							// Disable it because it gets sanitised
							// and is trusted anyway
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: sanitize(description),
							}}
							class='description'
						/>
					)}
					<aside
						id='block-region-content'
						class='block-region'
						data-blockregion='content'
						data-droptarget='1'
					/>
					<div class='profile_tree'>
						{[email, country, city, customfields, interests].some(
							item => typeof item !== 'undefined',
						) && (
							<section class='node_category card d-inline-block w-100 mb-3'>
								<div class='card-body'>
									<h3 class='lead'>User details</h3>
									<ul>
										{typeof email !== 'undefined' && (
											<li class='contentnode'>
												<dl>
													<dt>Email address</dt>
													<dd>
														<a href={`mailto:${encodeURIComponent(email)}`}>
															{email}
														</a>
													</dd>
												</dl>
											</li>
										)}
										{typeof country !== 'undefined' && (
											<li class='contentnode'>
												<dl>
													<dt>Country</dt>
													<dd>{country}</dd>
												</dl>
											</li>
										)}
										{typeof city !== 'undefined' && (
											<li class='contentnode'>
												<dl>
													<dt>City/town</dt>
													<dd>{city}</dd>
												</dl>
											</li>
										)}
										{Array.isArray(customfields)
											&& customfields.map(field => (
												<CustomField key={field.shortname} {...field} />
											))}
										{typeof interests !== 'undefined' && (
											<li class='contentnode'>
												<dl>
													<dt>Interests</dt>
													<dd>
														<div class='tag_list hideoverlimit '>
															<ul class='inline-list'>
																{interests.map(interest => (
																	<li key={interest}>
																		<a
																			href={`/tag/index.php?tag=${encodeURIComponent(
																				interest,
																			)}`}
																			class='badge badge-info'
																		>
																			{interest}
																		</a>
																	</li>
																))}
															</ul>
														</div>
													</dd>
												</dl>
											</li>
										)}
									</ul>
								</div>
							</section>
						)}
						{isReadonlyArray(courses) && courses.length > 0 && (
							<section class='node_category card d-inline-block w-100 mb-3'>
								<div class='card-body'>
									<h3 class='lead'>Course details</h3>
									<ul>
										<li class='contentnode'>
											<dl>
												<dt>Course profiles</dt>
												<dd>
													<ul>
														{courses.map(item => (
															<li key={item.id}>
																<a
																	href={`/user/view.php?id=${id}&course=${item.id}`}
																>
																	{item.coursename}
																</a>
															</li>
														))}
													</ul>
												</dd>
											</dl>
										</li>
									</ul>
								</div>
							</section>
						)}
						<section class='node_category card d-inline-block w-100 mb-3'>
							<div class='card-body'>
								<h3 class='lead'>Miscellaneous</h3>
								<ul>
									<li>
										<span>
											<a href={`/blog/index.php?userid=${id}`}>
												View all blog entries
											</a>
										</span>
									</li>
									<li>
										<span>
											<a href={`/mod/forum/user.php?id=${id}`}>Forum posts</a>
										</span>
									</li>
									<li>
										<span>
											<a href={`/mod/forum/user.php?id=${id}&mode=discussions`}>
												Forum discussions
											</a>
										</span>
									</li>
								</ul>
							</div>
						</section>
						{isUserProfile && (
							<section class='node_category card d-inline-block w-100 mb-3'>
								<div class='card-body'>
									<h3 class='lead'>Reports</h3>
									<ul>
										<li>
											<span>
												<a href='/report/usersessions/user.php'>
													Browser sessions
												</a>
											</span>
										</li>
										<li>
											<span>
												<a
													href={`/grade/report/overview/index.php?userid=${userId}&id=1`}
												>
													Grades overview
												</a>
											</span>
										</li>
									</ul>
								</div>
							</section>
						)}
						<section class='node_category card d-inline-block w-100 mb-3'>
							<div class='card-body'>
								<h3 class='lead'>Login activity</h3>
								<ul>
									{typeof firstaccess !== 'undefined' && (
										<li class='contentnode'>
											<dl>
												<dt>First access to site</dt>
												<dd>
													{unix(firstaccess).format('dddd, D MMMM YYYY, H:mm')}
													{' ('}
													{unix(firstaccess).fromNow(false)})
												</dd>
											</dl>
										</li>
									)}
									{typeof lastaccess !== 'undefined' && (
										<li class='contentnode'>
											<dl>
												<dt>Last access to site</dt>
												<dd>
													{unix(lastaccess).format('dddd, D MMMM YYYY, H:mm')}
													{' ('}
													{unix(lastaccess).fromNow(false)})
												</dd>
											</dl>
										</li>
									)}
								</ul>
							</div>
						</section>
					</div>
				</div>
			</div>
		</section>
	</Portal>
);
