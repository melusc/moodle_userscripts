type GetUserIdResponse =
	| {
			exception: string;
			errorcode: string;
			message: string;
	  }
	| {
			userid: number;

			// There's more, but that's not useful here
	  };

let cachedUserId: undefined | number;

export const getUserId_throwable = async (wstoken: string): Promise<number> => {
	if (cachedUserId !== undefined) {
		return cachedUserId;
	}

	const bodyParameters = new URLSearchParams({
		wsfunction: 'core_webservice_get_site_info',
		wstoken,
	});

	const response = await fetch(
		'/webservice/rest/server.php?moodlewsrestformat=json',
		{
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			body: bodyParameters.toString(),
		},
	);

	const responseJSON = (await response.json()) as GetUserIdResponse;

	if ('exception' in responseJSON) {
		throw new Error('token was undefined');
	}

	cachedUserId = responseJSON.userid;

	return cachedUserId;
};
