export default interface IBaseResponse<T> {
    isSuccess: boolean;
    message: string;
    data: T;
}