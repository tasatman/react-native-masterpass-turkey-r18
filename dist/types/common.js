export var RegistrationCheckAction;
(function (RegistrationCheckAction) {
    RegistrationCheckAction["linkCards"] = "link-cards";
    RegistrationCheckAction["listCards"] = "list-cards";
    RegistrationCheckAction["showMpOption"] = "show-mp-option";
})(RegistrationCheckAction || (RegistrationCheckAction = {}));
export var OtpType;
(function (OtpType) {
    OtpType["bank"] = "bank";
    OtpType["masterPass"] = "mp";
    OtpType["mPin"] = "mpin";
})(OtpType || (OtpType = {}));
export var OtpAction;
(function (OtpAction) {
    OtpAction["verifyOtp"] = "verify-otp";
    OtpAction["listCards"] = "list-cards";
    OtpAction["redirect3D"] = "redirect-3D";
})(OtpAction || (OtpAction = {}));
export var CardAction;
(function (CardAction) {
    CardAction["hideMpOption"] = "hide-mp-option";
    CardAction["purchase"] = "purchase";
})(CardAction || (CardAction = {}));
export var PurchaseType;
(function (PurchaseType) {
    PurchaseType[PurchaseType["NewCardRegistration"] = 0] = "NewCardRegistration";
    PurchaseType[PurchaseType["WithRegisteredCard"] = 1] = "WithRegisteredCard";
    PurchaseType[PurchaseType["DirectPayment"] = 2] = "DirectPayment";
})(PurchaseType || (PurchaseType = {}));
export var PurchaseAction;
(function (PurchaseAction) {
    PurchaseAction["verifyOtp"] = "verify-otp";
    PurchaseAction["redirect3D"] = "redirect-3D";
})(PurchaseAction || (PurchaseAction = {}));
