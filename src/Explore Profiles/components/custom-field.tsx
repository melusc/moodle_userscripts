import {h, type FunctionalComponent} from 'preact';

import type {CustomField as CustomFieldType} from '../types.js';

export const CustomField: FunctionalComponent<CustomFieldType> = ({
	shortname,
	name,
	value,
}) => {
	if (shortname === 'skype') {
		return (
			<li class='contentnode'>
				<dl>
					<dt>{name}</dt>
					<dd>
						<a href={`skype:${value}?call`} rel='noopener noreferrer'>
							{value}
						</a>
					</dd>
				</dl>
			</li>
		);
	}

	if (shortname === 'msn') {
		return (
			<li class='contentnode'>
				<dl>
					<dt>{name}</dt>
					<dd>{value}</dd>
				</dl>
			</li>
		);
	}

	if (shortname === 'url') {
		return (
			<li class='contentnode'>
				<dl>
					<dt>{name}</dt>
					<dd>
						<a href={value} rel='noopener noreferrer'>
							{value}
						</a>
					</dd>
				</dl>
			</li>
		);
	}

	console.error('Unknown shortname', shortname);
	return null;
};
