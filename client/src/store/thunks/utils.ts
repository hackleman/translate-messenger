export const postMessageToDB = async (body: any) => {
    const token = localStorage.getItem("messenger-token") || "";
    
    const res = await fetch("/api/messages", {
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
        
    const result = await fetch("/api/conversations", {
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

export const getCurrentUserFromDB = async () => {
    const token = localStorage.getItem("messenger-token") || "";

    const res = await fetch("/api/users", {
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

    if (searchTerm.length > 0) {
        const result = await fetch(`/api/users/${searchTerm}`, {
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
    const res = await fetch("auth/register", {
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
    const res = await fetch("auth/login", {
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
    await fetch("/auth/logout", {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });

    localStorage.removeItem("messenger-token");
}

