import React, { Component } from "react";
import WebView from "react-native-webview";
import { masterPassHTML } from "./masterpass-html";
export class MasterPassTurkey extends Component {
    html;
    webView;
    requests = {};
    constructor(props) {
        super(props);
        this.html = masterPassHTML(props);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let js = [];
        if (this.props.token != prevProps.token)
            js.push(`$('[name="token"]').val('${this.props.token}');`);
        if (this.props.referenceNo != prevProps.referenceNo)
            js.push(`$('[name="referenceNo"]').val('${this.props.referenceNo}');`);
        if (this.props.userId != prevProps.userId)
            js.push(`$('[name="userId"], [name="msisdn"]').val('${this.props.userId}');`);
        if (this.props.sendSms != prevProps.sendSms)
            js.push(`$('[name="sendSms"]').val('${this.props.sendSms}');`);
        if (this.props.sendSmsLanguage != prevProps.sendSmsLanguage)
            js.push(`$('[name="sendSmsLanguage"]').val('${this.props.sendSmsLanguage}');`);
        if (this.props.macroMerchantId != prevProps.macroMerchantId)
            js.push(`$('[name="macroMerchantId"]').val('${this.props.macroMerchantId}');`);
        if (this.props.clientIp != prevProps.clientIp)
            js.push(`$('[name="clientIp"]').val('${this.props.clientIp}');`);
        if (js.length)
            this.execute(`${js.join(' ')} return true;`).catch(console.warn);
    }
    registrationCheck = () => this.execute('return registrationCheck()');
    linkCards = () => this.execute('return linkCards()');
    listCards = () => this.execute('return listCards()');
    deleteCard = (cardName) => this.execute(`return deleteCard("${cardName}")`);
    resendOtp = () => this.execute('return resendOtp()');
    verifyOtp = (code, type) => this.execute(`return verifyOtp("${code}","${type}")`);
    purchase = (args) => {
        if (args.card)
            return this.execute(`return purchaseWithNewCard(${JSON.stringify(args)})`);
        else if (args.cardName)
            return this.execute(`return purchaseWithExistingCard(${JSON.stringify(args)})`);
        else
            throw new Error('Card or cardname is required');
    };
    execute = (script) => {
        return new Promise((resolve, reject) => {
            const requestId = '_' + Math.round(Math.random() * 10000000000 + 1000000000);
            this.requests[requestId] = { resolve, reject };
            this.webView.injectJavaScript(`(async function () {
                ${script}
                })()
                .then(r => window.ReactNativeWebView.postMessage(JSON.stringify({source: 'RN', requestId: '${requestId}', result: r})))
                .catch(e => window.ReactNativeWebView.postMessage(JSON.stringify({source: 'RN', requestId: '${requestId}', error: e.message})));true;`);
        });
    };
    onMessage = (event) => {
        const parsed = JSON.parse(event.nativeEvent.data);
        if (!parsed.requestId)
            return this.onEvent(parsed);
        if (parsed.source != "RN")
            return this.onRequest(parsed.message, parsed.body)
                .then(r => this.webView.injectJavaScript(`(function () {RN.onMessage(${JSON.stringify({
                source: parsed.source,
                requestId: parsed.requestId,
                result: r
            })})})();true;`))
                .catch(e => this.webView.injectJavaScript(`(function () {RN.onMessage(${JSON.stringify({
                source: parsed.source,
                requestId: parsed.requestId,
                error: e.message
            })})})();true;`));
        const request = this.requests[parsed.requestId];
        if (!request)
            return;
        delete this.requests[parsed.requestId];
        if (parsed.error)
            request.reject(new Error(parsed.error));
        else
            request.resolve(parsed.result);
    };
    onEvent = (data) => {
        this.props.onEvent?.call(this, data);
    };
    onRequest = async (message, body) => {
        if (this.props.onRequest)
            return await this.props.onRequest(message, body);
        return null;
    };
    render() {
        return (React.createElement(WebView, { source: { html: this.html }, style: { opacity: 0 }, androidHardwareAccelerationDisabled: true, ref: c => this.webView = c, onMessage: this.onMessage }));
    }
}
