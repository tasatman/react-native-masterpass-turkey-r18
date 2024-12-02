import React, { Component } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { CardResult, DeleteCardResult, MasterPassTurkeyArgs, OtpResult, OtpType, PurchaseArgs, PurchaseResult, RegistrationCheckResult } from "./types/common";
export declare class MasterPassTurkey extends Component<MasterPassTurkeyProps> {
    html: any;
    webView: WebView;
    requests: {
        [requestId: string]: {
            resolve: (value: any) => any;
            reject: (error: any) => any;
        };
    };
    constructor(props: any);
    componentDidUpdate(prevProps: Readonly<MasterPassTurkeyProps>, prevState: Readonly<{}>, snapshot?: any): void;
    registrationCheck: () => Promise<RegistrationCheckResult>;
    linkCards: () => Promise<OtpResult>;
    listCards: () => Promise<CardResult>;
    deleteCard: (cardName: string) => Promise<DeleteCardResult>;
    resendOtp: () => Promise<OtpResult>;
    verifyOtp: (code: string, type: OtpType) => Promise<OtpResult>;
    purchase: (args: PurchaseArgs) => Promise<PurchaseResult>;
    execute: <T extends unknown>(script: any) => Promise<T>;
    onMessage: (event: WebViewMessageEvent) => void | Promise<void>;
    onEvent: (data: any) => void;
    onRequest: (message: any, body: any) => Promise<any>;
    render(): React.JSX.Element;
}
export interface MasterPassTurkeyProps extends MasterPassTurkeyArgs {
    onEvent?: (data: any) => any;
    onRequest?: (message: any, body: any) => any;
}
