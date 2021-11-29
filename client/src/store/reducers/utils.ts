export const addSearchedUsersToStore = (state: any, users: any) => {
    const currentUsers: any = {};

    state.forEach((convo: any) => {
        currentUsers[convo.otherUser.id] = true;
    })

    const newState = [...state];
    users.forEach((user: any) => {
        if(!currentUsers[user.id]) {
            let fakeConvo = { otherUser: user, messages: []};
            newState.push(fakeConvo)
        }
    })

    return newState;
}