import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { Bottle } from "model/interfaces";
import { NextPage } from "next";

interface PrivacyPolicyProps {
  products: Array<Bottle>;
  isLightTheme: boolean;
}

const PrivacyPolicy: NextPage<PrivacyPolicyProps> = ({
  isLightTheme,
  products,
}) => {
  return (
    <main
      className={`${
        isLightTheme ? "bg-white" : "bg-black"
      } w-full h-full container mx-auto`}>
      <Header products={products} isLightTheme={isLightTheme} />
      <section className="w-4/5 mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center">Privacy Policy </h1>
        <p className="my-2">Last updated: January 15, 2023</p>
        <p className="my-2">
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>
        <p className="my-2">
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>

        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            Interpretation and Definitions
          </h1>

          <h3 className="text-lg font-bold mt-4 mb-1">Interpretation</h3>
          <p className="my-2">
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h3 className="text-lg font-bold mt-4 mb-1">Definitions</h3>
          <p className="my-2">For the purposes of this Privacy Policy:</p>
          <ol className="list-decimal ml-10">
            <li>
              Account means a unique account created for You to access our
              Service or parts of our Service.
            </li>
            <li>
              Business, for the purpose of the CCPA (California Consumer Privacy
              Act), refers to the Company as the legal entity that collects
              Consumers&#39; personal information and determines the purposes
              and means of the processing of Consumers&#39; personal
              information, or on behalf of which such information is collected
              and that alone, or jointly with others, determines the purposes
              and means of the processing of consumers&#39; personal
              information, that does business in the State of California.
            </li>
            <li>
              Company (referred to as either &quot;the Company&quot;,
              &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this
              Agreement) refers to Personafumes Pvt Ltd, 1440 Coral Ridge Drive.
              For the purpose of the GDPR, the Company is the Data Controller.
            </li>
            <li>
              Consumer, for the purpose of the CCPA (California Consumer Privacy
              Act), means a natural person who is a California resident. A
              resident, as defined in the law, includes (1) every individual who
              is in the USA for other than a temporary or transitory purpose,
              and (2) every individual who is domiciled in the USA who is
              outside the USA for a temporary or transitory purpose.
            </li>
            <li>
              Cookies are small files that are placed on Your computer, mobile
              device or any other device by a website, containing the details of
              Your browsing history on that website among its many uses.
            </li>
            <li>Country refers to: Florida, United States</li>
            <li>
              Data Controller, for the purposes of the GDPR (General Data
              Protection Regulation), refers to the Company as the legal person
              which alone or jointly with others determines the purposes and
              means of the processing of Personal Data.
            </li>
            <li>
              Device means any device that can access the Service such as a
              computer, a cellphone or a digital tablet.
            </li>
            <li>
              Do Not Track (DNT) is a concept that has been promoted by US
              regulatory authorities, in particular the U.S. Federal Trade
              Commission (FTC), for the Internet industry to develop and
              implement a mechanism for allowing internet users to control the
              tracking of their online activities across websites.
            </li>
            <li>
              Facebook Fan Page is a public profile named BestPricePerfume
              specifically created by the Company on the Facebook social
              network, accessible from{" "}
              <a
                className="text-blue-500 font-bold hover:underline"
                href="https://facebook.com/personafumes">
                https://facebook.com/personafumes
              </a>{" "}
            </li>
            <li>
              Personal Data is any information that relates to an identified or
              identifiable individual.
              <br />
              For the purposes of GDPR, Personal Data means any information
              relating to You such as a name, an identification number, location
              data, online identifier or to one or more factors specific to the
              physical, physiological, genetic, mental, economic, cultural or
              social identity.
              <br />
              For the purposes of the CCPA, Personal Data means any information
              that identifies, relates to, describes or is capable of being
              associated with, or could reasonably be linked, directly or
              indirectly, with You.
            </li>
            <li>
              Sale, for the purpose of the CCPA (California Consumer Privacy
              Act), means selling, renting, releasing, disclosing,
              disseminating, making available, transferring, or otherwise
              communicating orally, in writing, or by electronic or other means,
              a Consumer&#39;s personal information to another business or a
              third party for monetary or other valuable consideration.
            </li>
            <li>Service refers to the Website.</li>
            <li>
              Service Provider means any natural or legal person who processes
              the data on behalf of the Company. It refers to third-party
              companies or individuals employed by the Company to facilitate the
              Service, to provide the Service on behalf of the Company, to
              perform services related to the Service or to assist the Company
              in analyzing how the Service is used. For the purpose of the GDPR,
              Service Providers are considered Data Processors.
            </li>
            <li>
              Third-party Social Media Service refers to any website or any
              social network website through which a User can log in or create
              an account to use the Service.
            </li>
            <li>
              Usage Data refers to data collected automatically, either
              generated by the use of the Service or from the Service
              infrastructure itself (for example, the duration of a page visit).
            </li>
            <li>
              Website refers to PersonaFumes, accessible from{" "}
              <a
                className="text-blue-500 font-bold hover:underline"
                href="https://www.personafumes.com">
                https://www.personafumes.com
              </a>
            </li>
            <li>
              You means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
              <br />
              Under GDPR (General Data Protection Regulation), You can be
              referred to as the Data Subject or as the User as you are the
              individual using the Service.
            </li>
          </ol>
        </section>

        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            Collecting and Using Your Personal Data
          </h1>
          <h2 className="text-xl font-bold ">Types of Data Collected</h2>
          <h4 className="text-lg font-bold mt-4">Personal Data</h4>
          <p className="my-2">
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to:
          </p>
          <ol className="list-decimal ml-10">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Usage Data</li>
          </ol>

          <h4 className="text-lg font-bold mt-4">Usage Data</h4>

          <p className="my-2">
            Usage Data is collected automatically when using the Service.
          </p>
          <p className="my-2">
            Usage Data may include information such as Your Device&#39;s
            Internet Protocol address (e.g. IP address), browser type, browser
            version, the pages of our Service that You visit, the time and date
            of Your visit, the time spent on those pages, unique device
            identifiers and other diagnostic data.
          </p>
          <p className="my-2">
            When You access the Service by or through a mobile device, We may
            collect certain information automatically, including, but not
            limited to, the type of mobile device You use, Your mobile device
            unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use,
            unique device identifiers and other diagnostic data.
          </p>
          <p className="my-2">
            We may also collect information that Your browser sends whenever You
            visit our Service or when You access the Service by or through a
            mobile device.
          </p>

          <h4 className="text-lg font-bold mt-4">
            Information from Third-Party Social Media Services
          </h4>
          <p className="my-2">
            The Company allows You to create an account and log in to use the
            Service through the following Third-party Social Media Services:
          </p>

          <ul className="list-disc ml-10">
            <li>Google</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkdIn</li>
          </ul>

          <p className="my-2">
            If You decide to register through or otherwise grant us access to a
            Third-Party Social Media Service, We may collect Personal data that
            is already associated with Your Third-Party Social Media
            Service&#39;s account, such as Your name, Your email address, Your
            activities or Your contact list associated with that account.
          </p>

          <p className="my-2">
            You may also have the option of sharing additional information with
            the Company through Your Third-Party Social Media Service&#39;s
            account. If You choose to provide such information and Personal
            Data, during registration or otherwise, You are giving the Company
            permission to use, share, and store it in a manner consistent with
            this Privacy Policy.
          </p>

          <h4 className="text-lg font-bold mt-4">
            Tracking Technologies and Cookies
          </h4>

          <p className="my-2">
            We use Cookies and similar tracking technologies to track the
            activity on Our Service and store certain information. Tracking
            technologies used are beacons, tags, and scripts to collect and
            track information and to improve and analyze Our Service. The
            technologies We use may include:
          </p>

          <ul className="list-disc ml-10">
            <li>
              Cookies or Browser Cookies. A cookie is a small file placed on
              Your Device. You can instruct Your browser to refuse all Cookies
              or to indicate when a Cookie is being sent. However, if You do not
              accept Cookies, You may not be able to use some parts of our
              Service. Unless you have adjusted Your browser setting so that it
              will refuse Cookies, our Service may use Cookies.
            </li>
            <li>
              Web Beacons. Certain sections of our Service and our emails may
              contain small electronic files known as web beacons (also referred
              to as clear gifs, pixel tags, and single-pixel gifs) that permit
              the Company, for example, to count users who have visited those
              pages or opened an email and for other related website statistics
              (for example, recording the popularity of a certain section and
              verifying system and server integrity).
            </li>
          </ul>

          <p className="my-2">
            Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
            Cookies. Persistent Cookies remain on Your personal computer or
            mobile device when You go offline, while Session Cookies are deleted
            as soon as You close Your web browser. You can learn more about
            cookies on TermsFeed website article.
          </p>
          <p className="my-2">
            We use both Session and Persistent Cookies for the purposes set out
            below:
          </p>

          <div className="ml-14 mt-4">
            <h5 className="font-bold">Necessary / Essential Cookies</h5>
            <div>Type: Session Cookies</div>
            <div>Administered by: Us</div>
            <p className="my-2">
              Purpose: These Cookies are essential to provide You with services
              available through the Website and to enable You to use some of its
              features. They help to authenticate users and prevent fraudulent
              use of user accounts. Without these Cookies, the services that You
              have asked for cannot be provided, and We only use these Cookies
              to provide You with those services.
            </p>
          </div>

          <div className="ml-14 mt-4">
            <h5 className="font-bold">
              Cookies Policy / Notice Acceptance Cookies
            </h5>
            <div>Type: Persistent Cookies</div>
            <div>Administered by: Us</div>
            <p className="my-2">
              Purpose: These Cookies identify if users have accepted the use of
              cookies on the Website.
            </p>
          </div>

          <div className="ml-14 mt-4">
            <h5 className="font-bold">Functionality Cookies</h5>
            <div>Type: Persistent Cookies</div>
            <div>Administered by: Us</div>

            <p className="my-2">
              Purpose: These Cookies allow us to remember choices You make when
              You use the Website, such as remembering your login details or
              language preference. The purpose of these Cookies is to provide
              You with a more personal experience and to avoid You having to
              re-enter your preferences every time You use the Website.
            </p>
          </div>

          <div className="ml-14 mt-4">
            <h5 className="font-bold">Tracking and Performance Cookies</h5>
            <div>Type: Persistent Cookies</div>
            <div>Administered by: Third-Parties</div>
            <p className="my-2">
              Purpose: These Cookies are used to track information about traffic
              to the Website and how users use the Website. The information
              gathered via these Cookies may directly or indirectly identify you
              as an individual visitor. This is because the information
              collected is typically linked to a pseudonymous identifier
              associated with the device you use to access the Website. We may
              also use these Cookies to test new pages, features or new
              functionality of the Website to see how our users react to them.
            </p>
          </div>
          <div className="ml-14 mt-4">
            <h5 className="font-bold">Targeting and Advertising Cookies</h5>
            <div>Type: Persistent Cookies</div>
            <div>Administered by: Third-Parties</div>
            <p className="my-2">
              Purpose: These Cookies track your browsing habits to enable Us to
              show advertising which is more likely to be of interest to You.
              These Cookies use information about your browsing history to group
              You with other users who have similar interests. Based on that
              information, and with Our permission, third party advertisers can
              place Cookies to enable them to show adverts which We think will
              be relevant to your interests while You are on third party
              websites.
            </p>
          </div>
          <p className="my-2">
            For more information about the cookies we use and your choices
            regarding cookies, please visit our Cookies Policy or the Cookies
            section of our Privacy Policy.
          </p>

          <div>
            <h2 className="text-xl font-bold ">Use of Your Personal Data</h2>
            <p className="my-2">
              The Company may use Personal Data for the following purposes:
            </p>

            <ol className="list-decimal ml-10">
              <li>
                To provide and maintain our Service, including to monitor the
                usage of our Service.
              </li>
              <li>
                To manage Your Account: to manage Your registration as a user of
                the Service. The Personal Data You provide can give You access
                to different functionalities of the Service that are available
                to You as a registered user.
              </li>
              <li>
                For the performance of a contract: the development, compliance
                and undertaking of the purchase contract for the products, items
                or services You have purchased or of any other contract with Us
                through the Service.
              </li>
              <li>
                To contact You: To contact You by email, telephone calls, SMS,
                or other equivalent forms of electronic communication, such as a
                mobile application&#39;s push notifications regarding updates or
                informative communications related to the functionalities,
                products or contracted services, including the security updates,
                when necessary or reasonable for their implementation.
              </li>
              <li>
                To provide You with news, special offers and general information
                about other goods, services and events which we offer that are
                similar to those that you have already purchased or enquired
                about unless You have opted not to receive such information.
              </li>
              <li>
                To manage Your requests: To attend and manage Your requests to
                Us.
              </li>
              <li>
                For business transfers: We may use Your information to evaluate
                or conduct a merger, divestiture, restructuring, reorganization,
                dissolution, or other sale or transfer of some or all of Our
                assets, whether as a going concern or as part of bankruptcy,
                liquidation, or similar proceeding, in which Personal Data held
                by Us about our Service users is among the assets transferred.
              </li>
              <li>
                For other purposes: We may use Your information for other
                purposes, such as data analysis, identifying usage trends,
                determining the effectiveness of our promotional campaigns and
                to evaluate and improve our Service, products, services,
                marketing and your experience.
              </li>
            </ol>
            <div className="mt-6 mb-2">
              We may share Your personal information in the following
              situations:
            </div>
            <ul className="list-disc ml-10">
              <li>
                With Service Providers: We may share Your personal information
                with Service Providers to monitor and analyze the use of our
                Service, to show advertisements to You to help support and
                maintain Our Service, for payment processing, to contact You.
              </li>
              <li>
                For business transfers: We may share or transfer Your personal
                information in connection with, or during negotiations of, any
                merger, sale of Company assets, financing, or acquisition of all
                or a portion of Our business to another company.
              </li>
              <li>
                With Affiliates: We may share Your information with Our
                affiliates, in which case we will require those affiliates to
                honor this Privacy Policy. Affiliates include Our parent company
                and any other subsidiaries, joint venture partners or other
                companies that We control or that are under common control with
                Us.
              </li>
              <li>
                With business partners: We may share Your information with Our
                business partners to offer You certain products, services or
                promotions.
              </li>
              <li>
                With other users: when You share personal information or
                otherwise interact in the public areas with other users, such
                information may be viewed by all users and may be publicly
                distributed outside. If You interact with other users or
                register through a Third- Party Social Media Service, Your
                contacts on the Third-Party Social Media Service may see Your
                name, profile, pictures and description of Your activity.
                Similarly, other users will be able to view descriptions of Your
                activity, communicate with You and view Your profile.
              </li>
              <li>
                With Your consent: We may disclose Your personal information for
                any other purpose with Your consent.
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold ">
              Retention of Your Personal Data
            </h2>
            <p className="my-2">
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies.
            </p>
            <p className="my-2">
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold ">
              Transfer of Your Personal Data
            </h2>
            <p className="my-2">
              Your information, including Personal Data, is processed at the
              Company&#39;s operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction.
            </p>
            <p className="my-2">
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.
            </p>
            <p className="my-2">
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold ">Delete Your Personal Data</h2>
            <p className="my-2">
              You have the right to delete or request that We assist in deleting
              the Personal Data that We have collected about You.
            </p>
            <p className="my-2">
              Our Service may give You the ability to delete certain information
              about You from within the Service.
            </p>
            <p className="my-2">
              You may update, amend, or delete Your information at any time by
              signing in to Your Account, if you have one, and visiting the
              account settings section that allows you to manage Your personal
              information. You may also contact Us to request access to,
              correct, or delete any personal information that You have provided
              to Us.
            </p>
            <p className="my-2">
              Please note, however, that We may need to retain certain
              information when we have a legal obligation or lawful basis to do
              so.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold ">
              Disclosure of Your Personal Data
            </h2>
            <div>
              <h4 className="text-lg font-bold mt-4">Business Transactions</h4>
              <p className="my-2">
                If the Company is involved in a merger, acquisition or asset
                sale, Your Personal Data may be transferred. We will provide
                notice before Your Personal Data is transferred and becomes
                subject to a different Privacy Policy.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mt-4">Law enforcement</h4>
              <p className="my-2">
                Under certain circumstances, the Company may be required to
                disclose Your Personal Data if required to do so by law or in
                response to valid requests by public authorities (e.g. a court
                or a government agency).
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mt-4">
                Other legal requirements
              </h4>
              <p className="my-2">
                The Company may disclose Your Personal Data in the good faith
                belief that such action is necessary to:
              </p>
              <ul className="list-disc ml-10">
                <li>Comply with a legal obligation</li>
                <li>
                  Protect and defend the rights or property of the Company
                </li>
                <li>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service
                </li>
                <li>
                  Protect the personal safety of Users of the Service or the
                  public
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold ">
              Security of Your Personal Data
            </h2>
            <p className="my-2">
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </p>
          </div>
        </section>
        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            Detailed Information on the Processing of Your Personal Data
          </h1>
          <p className="my-2">
            The Service Providers We use may have access to Your Personal Data.
            These third-party vendors collect, store, use, process and transfer
            information about Your activity on Our Service in accordance with
            their Privacy Policies.
          </p>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">Analytics</h3>
            <p className="my-2">
              We may use third-party Service providers to monitor and analyze
              the use of our Service.
            </p>
            <div className="ml-8">
              <h4 className="font-bold mt-4">Google Analytics</h4>
              <p className="my-2">
                Google Analytics is a web analytics service offered by Google
                that tracks and reports website traffic. Google uses the data
                collected to track and monitor the use of our Service. This data
                is shared with other Google services. Google may use the
                collected data to contextualize and personalize the ads of its
                own advertising network. You can opt-out of having made your
                activity on the Service available to Google Analytics by
                installing the Google Analytics opt-out browser add-on. The
                add-on prevents the Google Analytics JavaScript (ga.js,
                analytics.js and dc.js) from sharing information with Google
                Analytics about visits activity.
                <br />
                For more information on the privacy practices of Google, please
                visit the Google Privacy &amp; Terms web page:{" "}
                <a
                  className="text-blue-500 font-bold hover:underline"
                  href="https://policies.google.com/privacy">
                  https://policies.google.com/privacy
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">Advertising</h3>
            <p className="my-2">
              We may use Service Providers to show advertisements to You to help
              support and maintain Our Service.
            </p>
            <div className="ml-8">
              <h4 className="font-bold mt-4">
                Google AdSense & DoubleClick Cookie
              </h4>
              <p className="my-2">
                Google, as a third party vendor, uses cookies to serve ads on
                our Service. Google&apos;s use of the DoubleClick cookie enables
                it and its partners to serve ads to our users based on their
                visit to our Service or other websites on the Internet.
                <br />
                You may opt out of the use of the DoubleClick Cookie for
                interest-based advertising by visiting the Google Ads Settings
                web page: <br />
                <a
                  className="text-blue-500 font-bold hover:underline"
                  href="https://www.google.com/ads/preferences">
                  https://www.google.com/ads/preferences/
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">Email Marketing</h3>
            <p className="my-2">
              We may use Your Personal Data to contact You with newsletters,
              marketing or promotional materials and other information that may
              be of interest to You. You may opt-out of receiving any, or all,
              of these communications from Us by following the unsubscribe link
              or instructions provided in any email We send or by contacting Us.
              <br />
              We may use Email Marketing Service Providers to manage and send
              emails to You.
            </p>
            <div className="ml-8">
              <h4 className="font-bold mt-4">Mailchimp</h4>
              <p className="my-2">
                Mailchimp is an email marketing sending service provided by The
                Rocket Science Group LLC.
                <br />
                For more information on the privacy practices of Mailchimp,
                please visit their Privacy policy:{" "}
                <a
                  className="text-blue-500 font-bold hover:underline"
                  href="https://mailchimp.com/legal/privacy">
                  https://mailchimp.com/legal/privacy/
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">Payments</h3>
            <p className="my-2">
              We may provide paid products and/or services within the Service.
              In that case, we may use third-party services for payment
              processing (e.g. payment processors).
            </p>
            <p className="my-2">
              We will not store or collect Your payment card details. That
              information is provided directly to Our third-party payment
              processors whose use of Your personal information is governed by
              their Privacy Policy. These payment processors adhere to the
              standards set by PCI-DSS as managed by the PCI Security Standards
              Council, which is a joint effort of brands like Visa, Mastercard,
              American Express and Discover. PCI-DSS requirements help ensure
              the secure handling of payment information.
            </p>
            <div className="ml-8">
              <h4 className="font-bold mt-4">Stripe</h4>
              <p className="my-2">
                Their Privacy Policy can be viewed at{" "}
                <a
                  className="text-blue-500 font-bold hover:underline"
                  href="https://stripe.com/us/privacy">
                  https://stripe.com/us/privacy
                </a>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            GDPR Privacy
          </h1>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Legal Basis for Processing Personal Data under GDPR
            </h3>
            <p className="my-2">
              We may process Personal Data under the following conditions:
            </p>
            <ul className="list-disc ml-10">
              <li>
                Consent: You have given Your consent for processing Personal
                Data for one or more specific purposes.
              </li>
              <li>
                Performance of a contract: Provision of Personal Data is
                necessary for the performance of an agreement with You and/or
                for any pre-contractual obligations thereof.
              </li>
              <li>
                Legal obligations: Processing Personal Data is necessary for
                compliance with a legal obligation to which the Company is
                subject.
              </li>
              <li>
                Vital interests: Processing Personal Data is necessary in order
                to protect Your vital interests or of another natural person.
              </li>
              <li>
                Public interests: Processing Personal Data is related to a task
                that is carried out in the public interest or in the exercise of
                official authority vested in the Company.
              </li>
              <li>
                Legitimate interests: Processing Personal Data is necessary for
                the purposes of the legitimate interests pursued by the Company.
              </li>
            </ul>
            <p className="my-2">
              In any case, the Company will gladly help to clarify the specific
              legal basis that applies to the processing, and in particular
              whether the provision of Personal Data is a statutory or
              contractual requirement, or a requirement necessary to enter into
              a contract.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Your Rights under the GDPR
            </h3>
            <p className="my-2">
              The Company undertakes to respect the confidentiality of Your
              Personal Data and to guarantee You can exercise Your rights.
            </p>
            <p className="my-2">
              You have the right under this Privacy Policy, and by law if You
              are within the EU, to:
            </p>
            <ul className="list-disc ml-10">
              <li>
                Request access to Your Personal Data. The right to access,
                update or delete the information We have on You. Whenever made
                possible, you can access, update or request deletion of Your
                Personal Data directly within Your account settings section. If
                you are unable to perform these actions yourself, please contact
                Us to assist You. This also enables You to receive a copy of the
                Personal Data We hold about You.
              </li>
              <li>
                Request correction of the Personal Data that We hold about You.
                You have the right to have any incomplete or inaccurate
                information We hold about You corrected.
              </li>
              <li>
                Object to processing of Your Personal Data. This right exists
                where We are relying on a legitimate interest as the legal basis
                for Our processing and there is something about Your particular
                situation, which makes You want to object to our processing of
                Your Personal Data on this ground. You also have the right to
                object where We are processing Your Personal Data for direct
                marketing purposes.
              </li>
              <li>
                Request erasure of Your Personal Data. You have the right to ask
                Us to delete or remove Personal Data when there is no good
                reason for Us to continue processing it.
              </li>
              <li>
                Request the transfer of Your Personal Data. We will provide to
                You, or to a third-party You have chosen, Your Personal Data in
                a structured, commonly used, machine-readable format. Please
                note that this right only applies to automated information which
                You initially provided consent for Us to use or where We used
                the information to perform a contract with You.
              </li>
              <li>
                Withdraw Your consent. You have the right to withdraw Your
                consent on using your Personal Data. If You withdraw Your
                consent, We may not be able to provide You with access to
                certain specific functionalities of the Service.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Exercising of Your GDPR Data Protection Rights
            </h3>
            <p className="my-2">
              You may exercise Your rights of access, rectification,
              cancellation and opposition by contacting Us. Please note that we
              may ask You to verify Your identity before responding to such
              requests. If You make a request, We will try our best to respond
              to You as soon as possible.
            </p>
            <p className="my-2">
              You have the right to complain to a Data Protection Authority
              about Our collection and use of Your Personal Data. For more
              information, if You are in the European Economic Area (EEA),
              please contact Your local data protection authority in the EEA.
            </p>
          </div>
        </section>

        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            Facebook Fan Page
          </h1>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Data Controller for the Facebook Fan Page
            </h3>
            <p className="my-2">
              The Company is the Data Controller of Your Personal Data collected
              while using the Service. As operator of the Facebook Fan Page{" "}
              <a
                className="text-blue-500 font-bold hover:underline"
                href="https://facebook.com/personafumes">
                https://facebook.com/personafumes
              </a>
              , the Company and the operator of the social network Facebook are
              Joint Controllers.
            </p>
            <p className="my-2">
              The Company has entered into agreements with Facebook that define
              the terms for use of the Facebook Fan Page, among other things.
              These terms are mostly based on the Facebook Terms of Service:{" "}
              <a
                className="text-blue-500 font-bold hover:underline"
                href="https://www.facebook.com/terms.php">
                https://www.facebook.com/terms.php
              </a>
            </p>
            <p className="my-2">
              Visit the Facebook Privacy Policy{" "}
              <a
                className="text-blue-500 font-bold hover:underline"
                href="https://www.facebook.com/policy.php">
                https://www.facebook.com/policy.php
              </a>
              for more information about how Facebook manages Personal data or
              contact Facebook online, or by mail: Facebook, Inc. ATTN, Privacy
              Operations, 1601 Willow Road, Menlo Park, CA 94025, United States.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">Facebook Insights</h3>
            <p className="my-2">
              We use the Facebook Insights function in connection with the
              operation of the Facebook Fan Page and on the basis of the GDPR,
              in order to obtain anonymized statistical data about Our users.
            </p>
            <p className="my-2">
              For this purpose, Facebook places a Cookie on the device of the
              user visiting Our Facebook Fan Page. Each Cookie contains a unique
              identifier code and remains active for a period of two years,
              except when it is deleted before the end of this period.
            </p>
            <p className="my-2">
              Facebook receives, records and processes the information stored in
              the Cookie, especially when the user visits the Facebook services,
              services that are provided by other members of the Facebook Fan
              Page and services by other companies that use Facebook services.
            </p>
            <p className="my-2">
              For more information on the privacy practices of Facebook, please
              visit Facebook Privacy Policy here:{" "}
              <a
                className="text-blue-500 font-bold hover:underline"
                href="https://www.facebook.com/privacy/explanation">
                https://www.facebook.com/privacy/explanation
              </a>
            </p>
          </div>
        </section>

        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            CCPA Privacy
          </h1>
          <p className="my-2">
            This privacy notice section for California residents supplements the
            information contained in Our Privacy Policy and it applies solely to
            all visitors, users, and others who reside in the State of
            California.
          </p>

          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Categories of Personal Information Collected
            </h3>
            <p className="my-2">
              We collect information that identifies, relates to, describes,
              references, is capable of being associated with, or could
              reasonably be linked, directly or indirectly, with a particular
              Consumer or Device. The following is a list of categories of
              personal information which we may collect or may have been
              collected from California residents within the last twelve (12)
              months.
            </p>
            <p className="my-2">
              Please note that the categories and examples provided in the list
              below are those defined in the CCPA. This does not mean that all
              examples of that category of personal information were in fact
              collected by Us, but reflects our good faith belief to the best of
              our knowledge that some of that information from the applicable
              category may be and may have been collected. For example, certain
              categories of personal information would only be collected if You
              provided such personal information directly to Us.
            </p>

            <ol className="list-decimal ml-10">
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category A: Identifiers.
                </h4>
                <div>
                  Examples: A real name, alias, postal address, unique personal
                  identifier, online identifier, Internet Protocol address,
                  email address, account name, driver&apos;s license number,
                  passport number, or other similar identifiers.
                </div>
                <div>Collected: Yes.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category B: Personal information categories listed in the
                  California Customer Records statute (Cal. Civ. Code §
                  1798.80(e)).
                </h4>
                <div>
                  Examples: A name, signature, Social Security number, physical
                  characteristics or description, address, telephone number,
                  passport number, driver&apos;s license or state identification
                  card number, insurance policy number, education, employment,
                  employment history, bank account number, credit card number,
                  debit card number, or any other financial information, medical
                  information, or health insurance information. Some personal
                  information included in this category may overlap with other
                  categories.
                </div>
                <div>Collected: Yes.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category C: Protected classification characteristics under
                  California or federal law.
                </h4>
                <div>
                  Examples: Age (40 years or older), race, color, ancestry,
                  national origin, citizenship, religion or creed, marital
                  status, medical condition, physical or mental disability, sex
                  (including gender, gender identity, gender expression,
                  pregnancy or childbirth and related medical conditions),
                  sexual orientation, veteran or military status, genetic
                  information (including familial genetic information).
                </div>
                <div>Collected: No.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category D: Commercial information.
                </h4>
                <div>
                  Examples: Records and history of products or services
                  purchased or considered.
                </div>
                <div>Collected: Yes.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category E: Biometric information.
                </h4>
                <div>
                  Examples: Genetic, physiological, behavioral, and biological
                  characteristics, or activity patterns used to extract a
                  template or other identifier or identifying information, such
                  as, fingerprints, faceprints, and voiceprints, iris or retina
                  scans, keystroke, gait, or other physical patterns, and sleep,
                  health, or exercise data.
                </div>
                <div>Collected: No.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category F: Internet or other similar network activity.
                </h4>
                <div>
                  Examples: Interaction with our Service or advertisement.
                </div>
                <div>Collected: Yes.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category G: Geolocation data.
                </h4>
                <div>Examples: Approximate physical location.</div>
                <div>Collected: No.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category H: Sensory data.
                </h4>
                <div>
                  Examples: Audio, electronic, visual, thermal, olfactory, or
                  similar information.
                </div>
                <div>Collected: No.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category I: Professional or employment-related information.
                </h4>
                <div>
                  Examples: Current or past job history or performance
                  evaluations.
                </div>
                <div>Collected: No.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category J: Non-public education information (per the Family
                  Educational Rights and Privacy Act (20 U.S.C. Section 1232g,
                  34 C.F.R. Part 99)).
                </h4>
                <div>
                  Examples: Education records directly related to a student
                  maintained by an educational institution or party acting on
                  its behalf, such as grades, transcripts, class lists, student
                  schedules, student identification codes, student financial
                  information, or student disciplinary records.
                </div>
                <div>Collected: No.</div>
              </li>
              <li>
                <h4 className="text-lg font-bold mt-4">
                  Category K: Inferences drawn from other personal information.
                </h4>
                <div>
                  Examples: Profile reflecting a person&apos;s preferences,
                  characteristics, psychological trends, predispositions,
                  behavior, attitudes, intelligence, abilities, and aptitudes.
                </div>
                <div>Collected: No.</div>
              </li>
            </ol>

            <p className="my-2">
              Under CCPA, personal information does not include:
            </p>
            <ul className="list-disc ml-10">
              <li>Publicly available information from government records</li>
              <li>Deidentified or aggregated consumer information</li>
              <li>
                Information excluded from the CCPA&apos;s scope, such as:{" "}
              </li>
              <li>
                Health or medical information covered by the Health Insurance
                Portability and Accountability Act of 1996 (HIPAA) and the
                California Confidentiality of Medical Information Act (CMIA) or
                clinical trial data
              </li>
              <li>
                Personal Information covered by certain sector-specific privacy
                laws, including the Fair Credit Reporting Act (FRCA), the
                Gramm-Leach-Bliley Act (GLBA) or California Financial
                Information Privacy Act (FIPA), and the Driver&apos;s Privacy
                Protection Act of 1994
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Sources of Personal Information
            </h3>
            <p className="my-2">
              We obtain the categories of personal information listed above from
              the following categories of sources:
            </p>
            <ul className="list-disc ml-10">
              <li>
                Directly from You. For example, from the forms You complete on
                our Service, preferences You express or provide through our
                Service, or from Your purchases on our Service.
              </li>
              <li>
                Indirectly from You. For example, from observing Your activity
                on our Service.
              </li>
              <li>
                Automatically from You. For example, through cookies We or our
                Service Providers set on Your Device as You navigate through our
                Service.
              </li>
              <li>
                From Service Providers. For example, third-party vendors to
                monitor and analyze the use of our Service, third-party vendors
                to provide advertising on our Service, third-party vendors for
                payment processing, or other third-party vendors that We use to
                provide the Service to You.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Use of Personal Information for Business Purposes or Commercial
              Purposes
            </h3>
            <p className="my-2">
              We may use or disclose personal information We collect for
              &quot;business purposes&quot;or&quot;commercial purposes&quot;(as
              defined under the CCPA), which may include the following examples:
            </p>

            <ul className="list-disc ml-10">
              <li>To operate our Service and provide You with our Service.</li>
              <li>
                To provide You with support and to respond to Your inquiries,
                including to investigate and address Your concerns and monitor
                and improve our Service.
              </li>
              <li>
                To fulfill or meet the reason You provided the information. For
                example, if You share Your contact information to ask a question
                about our Service, We will use that personal information to
                respond to Your inquiry. If You provide Your personal
                information to purchase a product or service, We will use that
                information to process Your payment and facilitate delivery.
              </li>
              <li>
                To respond to law enforcement requests and as required by
                applicable law, court order, or governmental regulations.
              </li>
              <li>
                As described to You when collecting Your personal information or
                as otherwise set forth in the CCPA.
              </li>
              <li>For internal administrative and auditing purposes.</li>
              <li>
                To detect security incidents and protect against malicious,
                deceptive, fraudulent or illegal activity, including, when
                necessary, to prosecute those responsible for such activities.
              </li>
            </ul>
            <p className="my-2">
              Please note that the examples provided above are illustrative and
              not intended to be exhaustive. For more details on how we use this
              information, please refer to the&quot;Use of Your Personal
              Data&auto; section.
            </p>
            <p className="my-2">
              If We decide to collect additional categories of personal
              information or use the personal information We collected for
              materially different, unrelated, or incompatible purposes We will
              update this Privacy Policy.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Disclosure of Personal Information for Business Purposes or
              Commercial Purposes
            </h3>
            <p className="my-2">
              We may use or disclose and may have used or disclosed in the last
              twelve (12) months the following categories of personal
              information for business or commercial purposes:
            </p>
            <ul className="list-disc ml-10">
              <li>Category A: Identifiers</li>
              <li>
                Category B: Personal information categories listed in the
                California Customer Records statute (Cal. Civ. Code §
                1798.80(e))
              </li>
              <li>Category D: Commercial information</li>
              <li>Category F: Internet or other similar network activity</li>
            </ul>
            <p className="my-2">
              Please note that the categories listed above are those defined in
              the CCPA. This does not mean that all examples of that category of
              personal information were in fact disclosed, but reflects our good
              faith belief to the best of our knowledge that some of that
              information from the applicable category may be and may have been
              disclosed.
            </p>
            <p className="my-2">
              When We disclose personal information for a business purpose or a
              commercial purpose, We enter a contract that describes the purpose
              and requires the recipient to both keep that personal information
              confidential and not use it for any purpose except performing the
              contract.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Sale of Personal Information
            </h3>
            <p className="my-2">
              As defined in the CCPA,&quot;sell&quot;and&quot;sale&quot;mean
              selling, renting, releasing, disclosing, disseminating, making
              available, transferring, or otherwise communicating orally, in
              writing, or by electronic or other means, a consumer&apos;s
              personal information by the business to a third party for valuable
              consideration. This means that We may have received some kind of
              benefit in return for sharing personal information, but not
              necessarily a monetary benefit.
            </p>
            <p className="my-2">
              Please note that the categories listed below are those defined in
              the CCPA. This does not mean that all examples of that category of
              personal information were in fact sold, but reflects our good
              faith belief to the best of our knowledge that some of that
              information from the applicable category may be and may have been
              shared for value in return.
            </p>
            <p className="my-2">
              We may sell and may have sold in the last twelve (12) months the
              following categories of personal information:
            </p>
            <ul className="list-disc ml-10">
              <li>Category A: Identifiers</li>
              <li>
                Category B: Personal information categories listed in the
                California Customer Records statute (Cal. Civ. Code §
                1798.80(e))
              </li>
              <li>Category D: Commercial information</li>
              <li>Category F: Internet or other similar network activity</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Share of Personal Information
            </h3>
            <p className="my-2">
              We may share Your personal information identified in the above
              categories with the following categories of third parties:
            </p>
            <ul className="list-disc ml-10">
              <li>Service Providers</li>
              <li>Payment processors</li>
              <li>Our affiliates</li>
              <li>Our business partners</li>
              <li>
                Third party vendors to whom You or Your agents authorize Us to
                disclose Your personal information in connection with products
                or services We provide to You
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Sale of Personal Information of Minors Under 16 Years of Age
            </h3>
            <p className="my-2">
              We do not knowingly collect personal information from minors under
              the age of 16 through our Service, although certain third party
              websites that we link to may do so. These third-party websites
              have their own terms of use and privacy policies and we encourage
              parents and legal guardians to monitor their children&apos;s
              Internet usage and instruct their children to never provide
              information on other websites without their permission.
            </p>
            <p className="my-2">
              We do not sell the personal information of Consumers We actually
              know are less than 16 years of age, unless We receive affirmative
              authorization (the&quot;right to opt-in&auot;) from either the
              Consumer who is between 13 and 16 years of age, or the parent or
              guardian of a Consumer less than 13 years of age. Consumers who
              opt-in to the sale of personal information may opt-out of future
              sales at any time. To exercise the right to opt-out, You (or Your
              authorized representative) may submit a request to Us by
              contacting Us.
            </p>
            <p className="my-2">
              If You have reason to believe that a child under the age of 13 (or
              16) has provided Us with personal information, please contact Us
              with sufficient detail to enable Us to delete that information.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Your Rights under the CCPA
            </h3>
            <p className="my-2">
              The CCPA provides California residents with specific rights
              regarding their personal information. If You are a resident of
              California, You have the following rights:
            </p>
            <ul className="list-disc ml-10">
              <li>
                The right to notice. You have the right to be notified which
                categories of Personal Data are being collected and the purposes
                for which the Personal Data is being used.
              </li>
              <li>
                The right to request. Under CCPA, You have the right to request
                that We disclose information to You about Our collection, use,
                sale, disclosure for business purposes and share of personal
                information. Once We receive and confirm Your request, We will
                disclose to You:{" "}
                <ul className="list-disc ml-10 mt-4">
                  <li>
                    The categories of personal information We collected about
                    You
                  </li>
                  <li>
                    The categories of sources for the personal information We
                    collected about You
                  </li>
                  <li>
                    Our business or commercial purpose for collecting or selling
                    that personal information
                  </li>
                  <li>
                    The categories of third parties with whom We share that
                    personal information
                  </li>
                  <li>
                    The specific pieces of personal information We collected
                    about You
                  </li>
                  <li>
                    If we sold Your personal information or disclosed Your
                    personal information for a business purpose, We will
                    disclose to You:{" "}
                    <ul className="list-disc ml-10 mt-4">
                      <li>
                        The categories of personal information categories sold
                      </li>
                      <li>
                        The categories of personal information categories
                        disclosed
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="mt-4">
                The right to say no to the sale of Personal Data (opt-out). You
                have the right to direct Us to not sell Your personal
                information. To submit an opt-out request please contact Us.
              </li>
              <li>
                The right to delete Personal Data. You have the right to request
                the deletion of Your Personal Data, subject to certain
                exceptions. Once We receive and confirm Your request, We will
                delete (and direct Our Service Providers to delete) Your
                personal information from our records, unless an exception
                applies. We may deny Your deletion request if retaining the
                information is necessary for Us or Our Service Providers to:{" "}
                <ul className="list-disc ml-10 mt-4">
                  <li>
                    Complete the transaction for which We collected the personal
                    information, provide a good or service that You requested,
                    take actions reasonably anticipated within the context of
                    our ongoing business relationship with You, or otherwise
                    perform our contract with You.
                  </li>
                  <li>
                    Detect security incidents, protect against malicious,
                    deceptive, fraudulent, or illegal activity, or prosecute
                    those responsible for such activities.
                  </li>
                  <li>
                    Debug products to identify and repair errors that impair
                    existing intended functionality.
                  </li>
                  <li>
                    Exercise free speech, ensure the right of another consumer
                    to exercise their free speech rights, or exercise another
                    right provided for by law.
                  </li>
                  <li>
                    Comply with the California Electronic Communications Privacy
                    Act (Cal. Penal Code § 1546 et. seq.).
                  </li>
                  <li>
                    Engage in public or peer-reviewed scientific, historical, or
                    statistical research in the public interest that adheres to
                    all other applicable ethics and privacy laws, when the
                    information&apos;s deletion may likely render impossible or
                    seriously impair the research&apos;s achievement, if You
                    previously provided informed consent.
                  </li>
                  <li>
                    Enable solely internal uses that are reasonably aligned with
                    consumer expectations based on Your relationship with Us.
                  </li>
                  <li>Comply with a legal obligation.</li>
                  <li>
                    Make other internal and lawful uses of that information that
                    are compatible with the context in which You provided it.
                  </li>
                </ul>
              </li>
              <li className="mt-4">
                The right not to be discriminated against. You have the right
                not to be discriminated against for exercising any of Your
                consumer&apos;s rights, including by:{" "}
                <ul className="list-disc ml-10 mt-4">
                  <li>Denying goods or services to You</li>
                  <li>
                    Charging different prices or rates for goods or services,
                    including the use of discounts or other benefits or imposing
                    penalties
                  </li>
                  <li>
                    Providing a different level or quality of goods or services
                    to You
                  </li>
                  <li>
                    Suggesting that You will receive a different price or rate
                    for goods or services or a different level or quality of
                    goods or services
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">
              Exercising Your CCPA Data Protection Rights
            </h3>
            <p className="my-2">
              In order to exercise any of Your rights under the CCPA, and if You
              are a California resident, You can contact Us:
            </p>
            <div className="ml-20 my-10">
              <div>By email: admin@personafumes.com</div>
              <div>
                By visiting this page on our website:{" "}
                <a
                  className="text-blue-500 font-bold hover:underline"
                  href="https://www.personafumes.com">
                  https://www.personafumes.com
                </a>
              </div>
            </div>
            <p className="my-2">
              Only You, or a person registered with the California Secretary of
              State that You authorize to act on Your behalf, may make a
              verifiable request related to Your personal information.
            </p>
            <p className="my-2 mt-6">Your request to Us must:</p>
            <ul className="list-disc ml-10">
              <li>
                Provide sufficient information that allows Us to reasonably
                verify You are the person about whom We collected personal
                information or an authorized representative
              </li>
              <li>
                Describe Your request with sufficient detail that allows Us to
                properly understand, evaluate, and respond to it
              </li>
            </ul>
            <p className="my-2 mt-6">
              We cannot respond to Your request or provide You with the required
              information if We cannot:
            </p>
            <ul className="list-disc ml-10">
              <li>Verify Your identity or authority to make the request</li>
              <li>And confirm that the personal information relates to You</li>
            </ul>
            <p className="my-2">
              We will disclose and deliver the required information free of
              charge within 45 days of receiving Your verifiable request. The
              time period to provide the required information may be extended
              once by an additional 45 days when reasonably necessary and with
              prior notice.
            </p>
            <p className="my-2">
              Any disclosures We provide will only cover the 12-month period
              preceding the verifiable request&apos;s receipt.
            </p>
            <p className="my-2">
              For data portability requests, We will select a format to provide
              Your personal information that is readily usable and should allow
              You to transmit the information from one entity to another entity
              without hindrance.
            </p>
          </div>
          <div>
            <p className="my-2">
              You have the right to opt-out of the sale of Your personal
              information. Once We receive and confirm a verifiable consumer
              request from You, we will stop selling Your personal information.
              To exercise Your right to opt-out, please contact Us.
            </p>
            <p className="my-2">
              The Service Providers we partner with (for example, our analytics
              or advertising partners) may use technology on the Service that
              sells personal information as defined by the CCPA law. If you wish
              to opt out of the use of Your personal information for
              interest-based advertising purposes and these potential sales as
              defined under CCPA law, you may do so by following the
              instructions below.
            </p>
            <p className="my-2">
              Please note that any opt out is specific to the browser You use.
              You may need to opt out on every browser that You use.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">Website</h3>
            <p className="my-2">
              You can opt out of receiving ads that are personalized as served
              by our Service Providers by following our instructions presented
              on the Service:
            </p>
            <ul className="list-disc ml-10">
              <li>
                The NAI&apos;s opt-out platform:{" "}
                <a
                  className="text-blue-500 font-bold hover:underline"
                  href="https://www.networkadvertising.org/choices">
                  https://www.networkadvertising.org/choices/
                </a>
              </li>
              <li>
                The EDAA&apos;s opt-out platform{" "}
                <a
                  className="text-blue-500 font-bold hover:underline"
                  href="https://www.youronlinechoices.com">
                  https://www.youronlinechoices.com/
                </a>{" "}
              </li>
              <li>
                The DAA&apos;s opt-out platform:{" "}
                <a
                  className="text-blue-500 font-bold hover:underline"
                  href="https://optout.aboutads.info/?c=2&lang=EN">
                  https://optout.aboutads.info/?c=2&lang=EN
                </a>
              </li>
            </ul>
            <p className="my-2">
              The opt out will place a cookie on Your computer that is unique to
              the browser You use to opt out. If you change browsers or delete
              the cookies saved by your browser, You will need to opt out again.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-1">Mobile Devices</h3>
            <p className="my-2">
              Your mobile device may give You the ability to opt out of the use
              of information about the apps You use in order to serve You ads
              that are targeted to Your interests:
            </p>
            <ul className="list-disc ml-10">
              <li>
                &quot;Opt out of Interest-Based Ads&quot;or&quot;Opt out of Ads
                Personalization&quot;on Android devices
              </li>
              <li>&quot;Limit Ad Tracking&quot;on iOS devices</li>
            </ul>
            <p className="my-2">
              You can also stop the collection of location information from Your
              mobile device by changing the preferences on Your mobile device.
            </p>
          </div>
        </section>

        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            &quot;Do Not Track&quot;Policy as Required by California Online
            Privacy Protection Act (CalOPPA)
          </h1>
          <p className="my-2">
            Our Service does not respond to Do Not Track signals.
          </p>
          <p className="my-2">
            However, some third party websites do keep track of Your browsing
            activities. If You are visiting such websites, You can set Your
            preferences in Your web browser to inform websites that You do not
            want to be tracked. You can enable or disable DNT by visiting the
            preferences or settings page of Your web browser.
          </p>
        </section>

        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            Children&apos;s Privacy
          </h1>
          <p className="my-2">
            Our Service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 13. If You are a parent or guardian and You are
            aware that Your child has provided Us with Personal Data, please
            contact Us. If We become aware that We have collected Personal Data
            from anyone under the age of 13 without verification of parental
            consent, We take steps to remove that information from Our servers.
          </p>
          <p className="my-2">
            If We need to rely on consent as a legal basis for processing Your
            information and Your country requires consent from a parent, We may
            require Your parent&apos;s consent before We collect and use that
            information.
          </p>
        </section>

        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            Your California Privacy Rights (California&apos;s Shine the Light
            law)
          </h1>
          <p className="my-2">
            Under California Civil Code Section 1798 (California&apos;s Shine
            the Light law), California residents with an established business
            relationship with us can request information once a year about
            sharing their Personal Data with third parties for the third
            parties&apos; direct marketing purposes.
          </p>
          <p className="my-2">
            If you&apos;d like to request more information under the California
            Shine the Light law, and if You are a California resident, You can
            contact Us using the contact information provided below.
          </p>
        </section>
        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            California Privacy Rights for Minor Users (California Business and
            Professions Code Section 22581)
          </h1>
          <p className="my-2">
            California Business and Professions Code Section 22581 allows
            California residents under the age of 18 who are registered users of
            online sites, services or applications to request and obtain removal
            of content or information they have publicly posted.
          </p>
          <p className="my-2">
            To request removal of such data, and if You are a California
            resident, You can contact Us using the contact information provided
            below, and include the email address associated with Your account.
          </p>
          <p className="my-2">
            Be aware that Your request does not guarantee complete or
            comprehensive removal of content or information posted online and
            that the law may not permit or require removal in certain
            circumstances.
          </p>
        </section>
        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            Links to Other Websites
          </h1>
          <p className="my-2">
            Our Service may contain links to other websites that are not
            operated by Us. If You click on a third party link, You will be
            directed to that third party&apos;s site. We strongly advise You to
            review the Privacy Policy of every site You visit.
          </p>
          <p className="my-2">
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </p>
        </section>
        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">
            Changes to this Privacy Policy
          </h1>
          <p className="my-2">
            We may update Our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="my-2">
            We will let You know via email and/or a prominent notice on Our
            Service, prior to the change becoming effective and update
            the&quot;Last updated&quot;date at the top of this Privacy Policy.
          </p>
          <p className="my-2">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </section>
        <section>
          <h1 className="text-2xl font-bold mt-8 mb-2 underline">Contact Us</h1>
          <p className="my-2">
            If you have any questions about this Privacy Policy, You can contact
            us:
          </p>
          <div className="ml-20">
            <p className="my-2">By email: admin@personafumes.com</p>
            <p className="my-2">
              By visiting this page on our website:{" "}
              <a
                className="text-blue-500 font-bold hover:underline"
                href="https://www.personafumes.com">
                https://www.personafumes.com
              </a>
            </p>
          </div>
        </section>
      </section>
      <Footer isLightTheme={isLightTheme} />
    </main>
  );
};

export default PrivacyPolicy;
