const BASE_URL = 'https://translate-messaging-server.herokuapp.com'

export const postMessageToDB = async (body: any) => {
    const token = localStorage.getItem("messenger-token") || "";
    
    const URL = BASE_URL + "/api/messages";

    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    return data;
}


export const getConversationsFromDB = async () => {
    const token = localStorage.getItem("messenger-token") || "";
    const URL = BASE_URL + "/api/conversations";

    const result = await fetch(URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
            "pragma": "no-cache"
        },
    });

    const data = await result.json();
    return data;
}

export const updateConversationInDB = async (body: any) => {
    const { username, conversationId } = body;
    const token = localStorage.getItem("messenger-token") || "";
    const URL = BASE_URL + "/api/conversations";

    await fetch(URL, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            username,
            conversationId
        })
    });
}

export const getCurrentUserFromDB = async () => {
    const token = localStorage.getItem("messenger-token") || "";
    const URL = BASE_URL + "/api/users";

    const res = await fetch(URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
            "pragma": "no-cache"
        }
    });
    const data = await res.json();
    return data;
}

export const getSearchedUsersFromDB = async (rawSearchTerm: string) => {
    const token = localStorage.getItem("messenger-token") || "";
    const searchTerm = rawSearchTerm.replace(/[^a-z]/gi, '');

    const URL = BASE_URL + `/api/users/${searchTerm}`;

    if (searchTerm.length > 0) {
        const result = await fetch(URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
        });
        const data = await result.json();
        return data;
    }
}

export const postRegistrationToDB = async (credentials: any) => {
    const URL = BASE_URL + "/auth/register";

    const res = await fetch(URL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    const data = await res.json();
    localStorage.setItem("messenger-token", data.token);
    return data;
}

export const postLoginToDB = async (credentials: any) => {
    const URL = BASE_URL + "/auth/login";

    const res = await fetch(URL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    const data = await res.json();

    localStorage.setItem("messenger-token", data.token);
    return data;
}

export const postLogoutToDB = async () => {
    const URL  = BASE_URL + "/auth/logout";

    await fetch(URL, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });

    localStorage.removeItem("messenger-token");
}

