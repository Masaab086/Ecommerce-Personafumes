import Footer from "components/Footer";
import Header from "components/Header";
import { NextPage } from "next";

interface EmailProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const EmailSuccess: NextPage<EmailProps> = ({ products, isLightTheme }) => {
  return (
    <div className="bg-black w-full h-full min-h-screen flex flex-col font-Raleway">
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex flex-col h-max m-auto pt-6 text-white">
        <div className="w-max p-8 rounded border">
          <div className="py-4">
            A Confirmation Email is send on your email address.
          </div>
          <div className="py-4">
            Please Open your email inbox and verify yourself.
          </div>
          <div className="py-4">If not received : check spam folder</div>
        </div>
      </div>

      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default EmailSuccess;
