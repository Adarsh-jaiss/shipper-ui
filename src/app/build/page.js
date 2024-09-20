"use client";
import React, { useState } from "react";
import { AlertCircle, ArrowRight, ArrowLeft, Ship, Check } from "lucide-react";
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
import BuildStatus from "@/components/buildstatus";

const steps = [
  {
    title: "Registry Details",
    fields: [
      "registryUser",
      "registryEmail",
      "registryPassword",
    ],
  },
  {
    title: "Build Configuration",
    fields: ["buildName", "githubUrl", "buildDir", "buildStrategy"],
  },
  {
    title: "Image Details",
    fields: ["imageName", "imgTag", "timeOut"],
  },
];

const placeholders = {
  registryUser: "stevejobs",
  registryEmail: "steve@gmail.com",
  registryPassword: "Password",
  buildName: "sample-build",
  githubUrl: "https://github.com/adarsh-jaiss/shipper-sample-code/",
  buildDir: "/app",
  buildStrategy: "ko",
  imgTag: "1.0.0",
  imageName: "shipper-sample-code",
  timeOut: "300000s"
};

export default function BuildImg() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    registryUser: "adarshjaiss",
    registryEmail: "techboyadarsh21@gmail.com",
    registryPassword: "hp15sleliya",
    buildName: "sample-build",
    githubUrl: "https://github.com/adarsh-jaiss/shipper-sample-code",
    buildDir: ".",
    buildStrategy: "ko",
    imageName: "shipper-sample-code",
    imgTag: "",
    timeOut: "",
  });
  const [buildStatus, setBuildStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBuildStatus("loading");
    setStatusMessage("Initiating build process...");

    try {
      console.log("Form data:", formData);
      const response = await fetch("https://shipper-backend-75xo.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to initiate build process");
      }

      const data = await response.json();
      console.log("Build response:", data);

      setBuildStatus("success");
      setStatusMessage(
        "Container image built and published successfully. Please check your docker hub!"
      );
    } catch (error) {
      console.error("Submission error:", error);
      setBuildStatus("error");
      setStatusMessage("Error: " + error.message);
    } 
    // finally {
    //   setTimeout(() => setBuildStatus(null), 5000); // Reset after 5 seconds
    // }
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
    <div className="min-h-screen flex items-center justify-center p-4">
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
                      ? "text-blue-500 lowercase"
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
                          placeholder={placeholders[key]}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </form>
              </TabsContent>
            ))}
          </Tabs>
          <BuildStatus status={buildStatus} message={statusMessage} />
        </CardContent>

        <hr />
        <CardFooter className="rounded-b-xl p-6 flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0 || buildStatus === "loading"}
            variant="outline"
            className="w-1/3 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={buildStatus === "loading"}
              className="w-1/3 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2"
            >
              next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={buildStatus === "loading"}
              className="w-1/3 bg-green-600 hover:bg-green-700 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2"
            >
              ship it! <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
