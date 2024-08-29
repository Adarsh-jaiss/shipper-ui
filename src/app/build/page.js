"use client";
import React, { useState } from "react";
import { AlertCircle, ArrowRight, ArrowLeft, Ship, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const steps = [
  {
    title: "Registry Details",
    fields: [
      "registryServer",
      "registryUser",
      "registryEmail",
      "registryPassword",
    ],
  },
  {
    title: "Build Configuration",
    fields: ["buildName", "githubUrl","buildDir","buildStrategy"],
  },
  {
    title: "Image Details",
    fields: [ "imageName","imgTag" ,"timeOut"],
  },
];

export default function BuildImg() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    registryServer: "",
    registryUser: "",
    registryEmail: "",
    registryPassword: "",
    buildName: "",
    githubUrl: "",
    buildDir: "",
    buildStrategy: "",
    imageName: "",
    imgTag: "",
    timeOut: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://api.shipper0.tech/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Container image build process initiated successfully");
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      setError(
        error.message || "An error occurred while processing your request"
      );
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="space-y-1 bg-neutral-900 text-white rounded-t-xl p-6">
          <div className="flex items-center justify-center space-x-2">
            <Ship className="h-8 w-8" />
            <CardTitle className="text-3xl font-bold">shipper</CardTitle>
          </div>
          <CardDescription className="text-white/85 align-middle w-full text-center">
            build your own container image with ease
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={steps[currentStep].title} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {steps.map((step, index) => (
                <TabsTrigger
                  key={step.title}
                  value={step.title}
                  disabled={index > currentStep}
                  className={
                    index <= currentStep
                      ? "text-blue-500 lowercase "
                      : "text-gray-400 lowercase"
                  }
                >
                  {index + 1}. {step.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {steps.map((step, index) => (
              <TabsContent key={step.title} value={step.title}>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4 mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.fields.map((key) => (
                      <div key={key} className="space-y-2">
                        <Label
                          htmlFor={key}
                          className="text-sm font-medium lowercase"
                        >
                          {key.charAt(0).toUpperCase() +
                            key
                              .slice(1)
                              .replace(/([A-Z])/g, " $1")
                              .trim()}
                        </Label>
                        <Input
                          type={
                            key.toLowerCase().includes("password")
                              ? "password"
                              : "text"
                          }
                          id={key}
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          className="w-full"
                          placeholder={`Enter ${
                            key.charAt(0).toUpperCase() +
                            key
                              .slice(1)
                              .replace(/([A-Z])/g, " $1")
                              .trim()
                          }`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </form>
              </TabsContent>
            ))}
          </Tabs>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <hr />
        <CardFooter className=" rounded-b-xl p-6 flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="w-1/3 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              className="w-1/3 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2"
            >
              next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="w-1/3 bg-green-600 hover:bg-green-700 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2"
            >
              ship it! <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
