"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { SectionContainer } from "@/components/ui/section-container";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const schema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  subject: yup.string().required(),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone must contain only digits")
    .min(7, "Phone must be at least 7 digits")
    .max(15, "Phone must be at most 15 digits"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  message: yup.string().required(),
});

type FormData = yup.InferType<typeof schema>;
const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    console.log("Submitted:", data);
    // send to API here...
    reset();
  };

  return (
    <SectionContainer className="mt-12">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-10 xl:gap-14">
        <Image
          src="/contactus/contact.png"
          alt=""
          width={616}
          height={734}
          className="rounded-xl hidden lg:block object-contain w-full lg:max-w-[48%]"
        />
        <Image
          src="/contactus/contact_mobile.png"
          alt=""
          width={616}
          height={734}
          className="rounded-xl object-contain lg:hidden w-full lg:max-w-[48%]"
        />
        <div className="w-full text-start flex flex-col gap-5">
          <h1 className="text-[28px] lg:text-[32px] font-bold text-black">
            Contact Us
          </h1>
          <p className="text-sm md:text-base font-medium">
            Our Customer Experience team is here to help
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-8 mt-5"
          >
            <div className="flex gap-5">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" {...register("first_name")} />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" {...register("last_name")} />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" {...register("subject")} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                className="min-h-[180px]"
                id="message"
                placeholder="Type your message here"
                {...register("message")}
              />
            </div>
            <Button className="bg-[#0E7346] w-full text-white lg:max-w-[120px] cursor-pointer h-[48px]">
              Submit
            </Button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 md:gap-12 lg:gap-14 mt-20">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col items-center justify-center gap-5 p-[25px] min-w-[250px] h-full">
          <div className="bg-[#00B206] rounded-full p-3 flex items-center justify-center">
            <MapPin className="text-white" />
          </div>
          <p className="text-[16px] font-semibold">Location</p>
          <p className="text-[13px] font-medium">
            Pride of Africa Foods,135 New John Street West, Birmingham B6 4LD,
            United Kingdom
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col items-center justify-center gap-5 p-[25px] min-w-[250px] h-full">
          <div className="bg-[#00B206] rounded-full p-3 flex items-center justify-center">
            <Mail className="text-white" />
          </div>
          <p className="text-[16px] font-semibold">Email Us</p>
          <p className="text-[13px] font-medium">
            sales.prideofafrica@gmail.com
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col items-center justify-center gap-5 p-[25px] min-w-[250px] h-full">
          <div className="bg-[#00B206] rounded-full p-3 flex items-center justify-center">
            <Phone className="text-white" />
          </div>
          <p className="text-[16px] font-semibold">Call Us</p>
          <p className="text-[13px] font-medium">+44 121 714 2221</p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactUs;
