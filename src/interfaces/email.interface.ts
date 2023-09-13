export interface iMailConfig {
  to: string;
  subject: string;
  text: string;
}

export interface iMailPassRecovery {
  userEmail: string;
  userName: string;
  protocol: string;
  host: string;
  resetToken: string;
}

export interface iMailPassRecoveryTemplate {
  body: {
    name: string;
    intro: string;
    action: {
      instructions: string;
      button: {
        color: string;
        text: string;
        link: string;
      };
    };
  };
}
