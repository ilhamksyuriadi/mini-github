import { State, Selector, Action, StateContext } from '@ngxs/store';
import { User } from './user.model'
import { AddUser, RemoveUser } from './user.action'

export class UserStateModel {
    users: User[]
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})

export class UserState {

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users
    }

    @Action(AddUser)
    add({getState, patchState}: StateContext<UserStateModel>, { payload }:AddUser) {
        const state = getState();
        patchState({
            users: [...state.users, payload] 
        })
    }

    @Action(RemoveUser)
    remove({getState, patchState}: StateContext<UserStateModel>, { payload }:RemoveUser) {
        patchState({
            users: getState().users.filter(u => u.username != payload)
        })
    }

}