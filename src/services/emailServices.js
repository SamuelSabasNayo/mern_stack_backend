import * as nodemailer from 'nodemailer';

/**
* This class contains all methods (functions) required to handle
* sendVerifyAccountEmail function.
* sendSuccessEmail function.
*/
class EmailHelper {
  /**
   * Handle send verify a user account email.
   * @param {string} url verify a user account url.
   * @param {string} generatedPassword user password.
   * @param {string} name user name.
   * @param {string} to a user email.
   * @returns {null} .
   */
  static async sendVerifyAccountEmail(url, generatedPassword, name, to) {
    const transporter = await nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'saloneverywheres@gmail.com',
          pass: 'mmvyxqtbofoabfkq',
        },
        logger: false,
        debug: false,
      },
      {
        from: 'Kora Soft <saloneverywheres@gmail.com>',
      },
    );

    const messageObj = {
      to: `${name} <${to}>`,
      subject: 'Verify Kora Soft Account',
      text: `Hello ${name}`,
      html: `<div>
      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
              <div style="
              width: 100%;
              display: grid;
              grid-template-columns: 1fr 1fr;
              justify-content: space-between;">
                  <h1 style="
                  font-size: 15px;
                  font-weight: 500;
                  padding-left: 0 5px;
                  font-family: sans-serif;">
                  <span style="
                  color: #fff;
                  font-weight: 900;
                  background-color: rgb(160, 0, 0);">KORE</span>
                  <span style="
                  font-weight: 900;
                  color: rgb(160, 0, 0);
                  background-color: #fff;">SOFT</span></h1>
                  <a href="https://Ksdacllp-dashboard-frontend-challenge.netlify.app" style="
                  text-decoration: none;
                  font-size: 11px;
                  font-weight: 800;">View in website</a>
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: rgb(160, 0, 0);
              color: #fff;
              padding: 1rem 0;
              font-size: 30px;">
                  <i class="fa fa-envelope"></i>
                  <p style="
                   font-size: 12px;
                  font-size: 18px;
                  text-transform: uppercase;
                  padding: 00px 30px;
                  font-weight: 900;">Welcome to KORE SOFT</p>
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 90%;
              background-color: #fff;" id="container3">
                  <h2 style="
                  font-size: 18px;
                  text-align: center;
                  width: 80%;
                  padding: 20px;
                  margin: 10px;
                  color: gray;">Confirmation Email</h2>
  
                  <p style="
                  font-size: 12px;
                  text-align: center;
                  width: 80%;
                  color: gray;
                  text-align: start;
                  margin: 10px;
                  padding: 20px;">To procced with verification of account, please click button below. NOTE: Keep this password (${generatedPassword}) you will use it to login after verifying your account successfully.</p>
  
                  <a href=${url} style="
                  width: 30%;
                  margin: 1rem 0;
                  cursor: default;"><button style="
                    text-align: center;
                    width: 80%;
                  background-color: rgb(160, 0, 0);
                  color: #fff;
                  font-size: 11px;
                  outline: none;
                  cursor: pointer;
                  border: none;
                  padding: 7px 0 ;">Verify Email adress</button></a>
                  
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;" id="container4">
                  <h2 style="
                  font-size: 18px;
                  text-align: center;
                  margin: 1.4rem;">Stay in touch</h2>
                  <div style="
                  width: 30%;
                  display: flex;
                  justify-content: space-between;
                  margin: 1.4rem;">   
                  <i style="
                  background-color: rgb(0, 145, 255);
                  border-radius: 50%;
                  color: #fff;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-twitter"></i>
                  <i style="
                  background-color: rgba(21, 24, 114, 0.788);
                  border-radius: 50%;
                  color: #fff;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-facebook"></i>
                  <i style="
                  background-color: #fff;
                  border-radius: 50%;
                  color:rgb(0, 145, 255) ;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-linkedin"></i>
                  </div>
                  <p style="
                  font-size: 12px;
                  text-align: center;
                  margin: 10px auto;">@ 2014 All Rights Reserved by <a href="https://Ksdacllp-dashboard-frontend-challenge.netlify.app" style="
                  text-decoration: none;;"> <span style="
                  font-size: 11px;
                  padding : 2px 2px 2px 5px;
                  color: #fff;
                  font-weight: 900;
                  background-color: rgb(160, 0, 0);">KORE</span><span style="
                  font-size: 11px;
                  padding : 2px 2px 2px 5px;
                  font-weight: 900;
                  color: rgb(160, 0, 0);
                  background-color: #fff;">SOFT</span> </a> </p> 
              </div>
  </div>`,
    };

    await transporter.sendMail(messageObj);
  }

  /**
   * Handle send verify a user account email.
   * @param {string} url verify a user account url.
   * @param {string} name user name.
   * @param {string} to a user email.
   * @returns {null} .
   */
  static async sendVerificationLinkEmail(url, name, to) {
    const transporter = await nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'saloneverywheres@gmail.com',
          pass: 'mmvyxqtbofoabfkq',
        },
        logger: false,
        debug: false,
      },
      {
        from: 'Kora Soft <saloneverywheres@gmail.com>',
      },
    );

    const messageObj = {
      to: `${name} <${to}>`,
      subject: 'Verification Kora Soft Account',
      text: `Hello ${name}`,
      html: `<div>
      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
              <div style="
              width: 100%;
              display: grid;
              grid-template-columns: 1fr 1fr;
              justify-content: space-between;">
                  <h1 style="
                  font-size: 15px;
                  font-weight: 500;
                  padding-left: 0 5px;
                  font-family: sans-serif;">
                  <span style="
                  color: #fff;
                  font-weight: 900;
                  background-color: rgb(160, 0, 0);">KORE</span>
                  <span style="
                  font-weight: 900;
                  color: rgb(160, 0, 0);
                  background-color: #fff;">SOFT</span></h1>
                  <a href="https://Ksdacllp-dashboard-frontend-challenge.netlify.app" style="
                  text-decoration: none;
                  font-size: 11px;
                  font-weight: 800;">View in website</a>
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: rgb(160, 0, 0);
              color: #fff;
              padding: 1rem 0;
              font-size: 30px;">
                  <i class="fa fa-envelope"></i>
                  <p style="
                   font-size: 12px;
                  font-size: 18px;
                  text-transform: uppercase;
                  padding: 00px 30px;
                  font-weight: 900;">Welcome to KORE SOFT</p>
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 90%;
              background-color: #fff;" id="container3">
                  <h2 style="
                  font-size: 18px;
                  text-align: center;
                  width: 80%;
                  padding: 20px;
                  margin: 10px;
                  color: gray;">Verification Email</h2>
  
                  <p style="
                  font-size: 12px;
                  text-align: center;
                  width: 80%;
                  color: gray;
                  text-align: start;
                  margin: 10px;
                  padding: 20px;">To procced with the action, please click button below.Any query ? Feel-free to reach-out to us we are happyly to respond your query.</p>
  
                  <a href=${url} style="
                  width: 30%;
                  margin: 1rem 0;
                  cursor: default;"><button style="
                    text-align: center;
                    width: 80%;
                  background-color: rgb(160, 0, 0);
                  color: #fff;
                  font-size: 11px;
                  outline: none;
                  cursor: pointer;
                  border: none;
                  padding: 7px 0 ;">Procced Now</button></a>
                  
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;" id="container4">
                  <h2 style="
                  font-size: 18px;
                  text-align: center;
                  margin: 1.4rem;">Stay in touch</h2>
                  <div style="
                  width: 30%;
                  display: flex;
                  justify-content: space-between;
                  margin: 1.4rem;">   
                  <i style="
                  background-color: rgb(0, 145, 255);
                  border-radius: 50%;
                  color: #fff;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-twitter"></i>
                  <i style="
                  background-color: rgba(21, 24, 114, 0.788);
                  border-radius: 50%;
                  color: #fff;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-facebook"></i>
                  <i style="
                  background-color: #fff;
                  border-radius: 50%;
                  color:rgb(0, 145, 255) ;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-linkedin"></i>
                  </div>
                  <p style="
                  font-size: 12px;
                  text-align: center;
                  margin: 10px auto;">@ 2014 All Rights Reserved by <a href="https://Ksdacllp-dashboard-frontend-challenge.netlify.app" style="
                  text-decoration: none;;"> <span style="
                  font-size: 11px;
                  padding : 2px 2px 2px 5px;
                  color: #fff;
                  font-weight: 900;
                  background-color: rgb(160, 0, 0);">KORE</span><span style="
                  font-size: 11px;
                  padding : 2px 2px 2px 5px;
                  font-weight: 900;
                  color: rgb(160, 0, 0);
                  background-color: #fff;">SOFT</span> </a> </p> 
              </div>
    </div>`,
    };

    await transporter.sendMail(messageObj);
  }

  /**
   * Handle send success email.
   * @param {string} url message.
   * @param {string} name user name.
   * @param {string} to a user email.
   * @returns {null} .
   */
  static async sendSuccessEmail(url, name, to) {
    const transporter = await nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'saloneverywheres@gmail.com',
          pass: 'mmvyxqtbofoabfkq',
        },
        logger: false,
        debug: false,
      },
      {
        from: 'Kora Soft <saloneverywheres@gmail.com>',
      },
    );

    const messageObj = {
      to: `${name} <${to}>`,
      subject: 'Successfully Kora Soft Account',
      text: `Hello ${name}`,
      html: `<div>
      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
              <div style="
              width: 100%;
              display: grid;
              grid-template-columns: 1fr 1fr;
              justify-content: space-between;">
                  <h1 style="
                  font-size: 15px;
                  font-weight: 500;
                  padding-left: 0 5px;
                  font-family: sans-serif;">
                  <span style="
                  color: #fff;
                  font-weight: 900;
                  background-color: rgb(160, 0, 0);">KORE</span>
                  <span style="
                  font-weight: 900;
                  color: rgb(160, 0, 0);
                  background-color: #fff;">SOFT</span></h1>
                  <a href="https://Ksdacllp-dashboard-frontend-challenge.netlify.app" style="
                  text-decoration: none;
                  font-size: 11px;
                  font-weight: 800;">View in website</a>
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: rgb(160, 0, 0);
              color: #fff;
              padding: 1rem 0;
              font-size: 30px;">
                  <i class="fa fa-envelope"></i>
                  <p style="
                   font-size: 12px;
                  font-size: 18px;
                  text-transform: uppercase;
                  padding: 00px 30px;
                  font-weight: 900;">Welcome to KORE SOFT</p>
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 90%;
              background-color: #fff;" id="container3">
                  <h2 style="
                  font-size: 18px;
                  text-align: center;
                  width: 80%;
                  padding: 20px;
                  margin: 10px;
                  color: gray;">Successfully Email</h2>
  
                  <p style="
                  font-size: 12px;
                  text-align: center;
                  width: 80%;
                  color: gray;
                  text-align: start;
                  margin: 10px;
                  padding: 20px;">Hello we are happyly to let you know that you are successfully completed the process. Any query ? Feel-free to reach-out to us we are happyly to respond your query.</p>
  
                  <a href=${url} style="
                  width: 30%;
                  margin: 1rem 0;
                  cursor: default;"><button style="
                    text-align: center;
                    width: 80%;
                  background-color: rgb(160, 0, 0);
                  color: #fff;
                  font-size: 11px;
                  outline: none;
                  cursor: pointer;
                  border: none;
                  padding: 7px 0 ;">Procced Now</button></a>
                  
              </div>
              <div style="width: 90%;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;" id="container4">
                  <h2 style="
                  font-size: 18px;
                  text-align: center;
                  margin: 1.4rem;">Stay in touch</h2>
                  <div style="
                  width: 30%;
                  display: flex;
                  justify-content: space-between;
                  margin: 1.4rem;">   
                  <i style="
                  background-color: rgb(0, 145, 255);
                  border-radius: 50%;
                  color: #fff;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-twitter"></i>
                  <i style="
                  background-color: rgba(21, 24, 114, 0.788);
                  border-radius: 50%;
                  color: #fff;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-facebook"></i>
                  <i style="
                  background-color: #fff;
                  border-radius: 50%;
                  color:rgb(0, 145, 255) ;
                  padding: 12px 14px;
                  cursor: pointer;" class="fa fa-linkedin"></i>
                  </div>
                  <p style="
                  font-size: 12px;
                  text-align: center;
                  margin: 10px auto;">@ 2014 All Rights Reserved by <a href="https://Ksdacllp-dashboard-frontend-challenge.netlify.app" style="
                  text-decoration: none;;"> <span style="
                  font-size: 11px;
                  padding : 2px 2px 2px 5px;
                  color: #fff;
                  font-weight: 900;
                  background-color: rgb(160, 0, 0);">KORE</span><span style="
                  font-size: 11px;
                  padding : 2px 2px 2px 5px;
                  font-weight: 900;
                  color: rgb(160, 0, 0);
                  background-color: #fff;">SOFT</span> </a> </p> 
              </div>
    </div>`,
    };

    await transporter.sendMail(messageObj);
  }
}

export default EmailHelper;
