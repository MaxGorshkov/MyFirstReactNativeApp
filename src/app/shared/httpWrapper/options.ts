import { ResponseType } from 'axios';

export class HttpWrapperOptions {
    errors: boolean;
    errorText?: string;
    success: boolean;
    successText?: string;
    wait: boolean;
    waitTimeout: number;
    timeout: number;
    extraTries: number;
    requestIdentificator?: string;
    cacheQueryParams?: string;
    responseType?: ResponseType;
    requestSequenceIdentificator?: string;

    constructor() {
        this.errors = true;
        this.success = false;
        this.wait = false;
        this.extraTries = 2;
        this.waitTimeout = 300;
        this.timeout = 10000;
        this.errorText = undefined;
        this.successText = undefined;
        this.requestIdentificator = undefined;
        this.cacheQueryParams = undefined;
        this.responseType = 'json';
        this.requestSequenceIdentificator = undefined;
    }

    public Errors(_errors: boolean): HttpWrapperOptions {
        this.errors = _errors;
        return this;
    }

    public ErrorText(_errorText: string): HttpWrapperOptions {
        this.errorText = _errorText;
        return this;
    }

    public Success(_success: boolean): HttpWrapperOptions {
        this.success = _success;
        return this;
    }

    public SuccessText(_successText: string): HttpWrapperOptions {
        this.successText = _successText;
        return this;
    }

    public Wait(_wait: boolean): HttpWrapperOptions {
        this.wait = _wait;
        return this;
    }

    public Timeout(_timeout: number): HttpWrapperOptions {
        this.timeout = _timeout;
        return this;
    }

    public WaitTimeout(_waitTimeout: number): HttpWrapperOptions {
        this.waitTimeout = _waitTimeout;
        return this;
    }

    public ExtraTries(_extraTries: number): HttpWrapperOptions {
        this.extraTries = _extraTries;
        return this;
    }

    public RequestIdentificator(_requestIdentificator: string): HttpWrapperOptions {
        this.requestIdentificator = _requestIdentificator;
        return this;
    }
    public CacheQueryParams(_cacheQueryParams: string): HttpWrapperOptions {
        this.cacheQueryParams = _cacheQueryParams;
        return this;
    }
    public ResponseType(_responseType: ResponseType): HttpWrapperOptions {
        this.responseType = _responseType;
        return this;
    }
    public RequestSequenceIdentificator(_requestSequenceIdentificator: string): HttpWrapperOptions {
        this.requestSequenceIdentificator = _requestSequenceIdentificator;
        return this;
    }
}
