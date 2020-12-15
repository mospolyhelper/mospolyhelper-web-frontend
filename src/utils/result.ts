export default class Result<T> {
    constructor(
        public value: any | null
    ) { }

    /**
     * Returns `true` if this instance represents a successful outcome.
     * In this case [isFailure] returns `false`.
     */
    get isSuccess(): boolean {
        return !(this.value instanceof Failure) && !(this.value instanceof Loading);
    }

    /**
     * Returns `true` if this instance represents a failed outcome.
     * In this case [isSuccess] returns `false`.
     */
    get isFailure(): boolean {
        return this.value instanceof Failure;
    }

    /**
     * Returns `true` if this instance represents a loading outcome.
     * In this case [isSuccess] returns `false`.
     */
    get isLoading(): boolean {
        return this.value instanceof Loading;
    }

    // value & error retrieval

    /**
     * Returns the encapsulated value if this instance represents [success][Result.isSuccess] or `null`
     * if it is [failure][Result.isFailure].
     *
     * This function is a shorthand for `getOrElse { null }` (see [getOrElse]) or
     * `fold(onSuccess = { it }, onFailure = { null })` (see [fold]).
     */
    getOrNull(): T | null {
        if (this.isFailure || this.isLoading)
            return null;
        else
            return this.value as T;
    }

    /**
     * Returns the encapsulated [Throwable] error if this instance represents [failure][isFailure] or `null`
     * if it is [success][isSuccess].
     *
     * This function is a shorthand for `fold(onSuccess = { null }, onFailure = { it })` (see [fold]).
     */
    errorOrNull(): Error | null {
        return (this.value as Failure)?.error;
    }

    /**
     * Returns a string `Success(v)` if this instance represents [success][Result.isSuccess]
     * where `v` is a string representation of the value or a string `Failure(x)` if
     * it is [failure][isFailure] where `x` is a string representation of the error.
     */

    tostring() {
        switch (this.value) {
            case Failure:
                return this.value.Tostring();
            case Loading: return "Loading";
            default: return "Success($value)";
        };
    }

    // companion with constructors

    /**
     * Companion object for [Result] class that contains its constructor functions
     * [success] and [failure].
     */
    /**
     * Returns an instance that encapsulates the given [value] as successful value.
     */
    static success<T>(value: T): Result<T> {
        return new Result<T>(value);
    }

    /**
     * Returns an instance that encapsulates the given [Throwable] [error] as failure.
     */
    static failure<T>(error: Error): Result<T> {
        return new Result<T>(ResultExt.createFailure<T>(error));
    }


    /**
     * Returns an instance of loading.
     */
    static loading<T>(): Result<T> {
        return new Result<T>(ResultExt.getLoading());
    }

}

export class Failure {
    constructor(public error: Error) { }
    //        equals(obj: any)
    //        {
    //            return this.error.equals((obj as Failure)?.error);
    //}
    //        hashCode()
    //{
    //    return error.GetHashCode();
    //}
    //        public override string Tostring()
    //{
    //    return $"Failure({error})";
    //}
}

export class Loading {
    private constructor() { }

    static loading = new Loading();
}

class ResultExt {
    /**
     * Creates an instance of internal marker [Result.Failure] class to
     * make sure that this class is not exposed in ABI.
     */
    static createFailure<T>(error: Error): any {
        return new Failure(error);
    }

    /**
     * Return an instance of internal marker Loading class to
     * make sure that this class is not exposed in ABI.
     */
    static getLoading(): any {
        return Loading.loading;
    }


    /**
     * Returns the encapsulated value if this instance represents [success][Result.isSuccess] or the
     * [defaultthis.value] if it is [failure][Result.isFailure].
     *
     * This function is a shorthand for `getOrElse { defaultthis.value }` (see [getOrElse]).
     */
    static getOrDefault<T extends R, R>(result: Result<T>, defaultValue: R): R {
        if (result.isFailure || result.isLoading) return defaultValue;
        return result.value as T;
    }



    /**
     * Performs the given [action] on the encapsulated [Throwable] error if this instance represents [failure][Result.isFailure].
     * Returns the original `Result` unchanged.
     */
    static onFailure<T>(result: Result<T>, action: (error: Error) => void): Result<T> {
        var e = result.errorOrNull();
        if (e != null) {
            action(e);
        }
        return result;
    }

    /**
     * Performs the given [action] on the encapsulated value if this instance represents [success][Result.isSuccess].
     * Returns the original `Result` unchanged.
     */
    static onSuccess<T>(result: Result<T>, action: (t: T) => void): Result<T> {
        if (result.isSuccess) action(result.value as T);
        return result;
    }

    /**
     * Performs the given [action] if this instance represents [loading][Result.isLoading].
     * Returns the original `Result` unchanged.
     */
    static onLoading<T>(result: Result<T>, action: () => void): Result<T> {
        if (result.isLoading) action();
        return result;
    }
}
