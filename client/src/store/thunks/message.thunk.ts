const saveMessage = async (body: any) => {
    const res = await fetch("auth/register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body
    });

    const data = await res.json();
    return data;

}

export const postMessage = (body: any) => async (dispatch: any) => {
    try {
        const data = await saveMessage(body);

        console.log(data);
    } catch (error) {
        console.error(error)
    }
}