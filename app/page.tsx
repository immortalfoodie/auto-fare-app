"use client"

import { useState } from "react"
import { Calculator, Clock, MapPin, ThumbsUp } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Auto fare data for major Indian cities
const cityFareData = {
  mumbai: {
    name: "Mumbai",
    baseFareDay: 26,
    baseFareNight: 33,
    perKmRate: 17.14,
    waitingChargePerMin: 1.42,
    minDistance: 1.5,
  },
  delhi: {
    name: "Delhi",
    baseFare: 30,
    perKmRate: 11,
    waitingChargePerMin: 0.75,
    minDistance: 1.5,
  },
  bangalore: {
    name: "Bangalore",
    baseFare: 30,
    perKmRate: 15,
    waitingChargePerMin: 0.5,
    minDistance: 2,
  },
  chennai: {
    name: "Chennai",
    baseFare: 50,
    perKmRate: 18,
    waitingChargePerMin: 1.5,
    minDistance: 1.8,
  },
  kolkata: {
    name: "Kolkata",
    baseFare: 30,
    perKmRate: 15,
    waitingChargePerMin: 1,
    minDistance: 2,
  },
  hyderabad: {
    name: "Hyderabad",
    baseFare: 20,
    perKmRate: 11,
    waitingChargePerMin: 0.5,
    minDistance: 1.6,
  },
  pune: {
    name: "Pune",
    baseFare: 25,
    perKmRate: 17,
    waitingChargePerMin: 1.42,
    minDistance: 1.5,
  },
}

export default function AutoFareCalculator() {
  const [city, setCity] = useState("mumbai")
  const [distance, setDistance] = useState("")
  const [waitTime, setWaitTime] = useState("")
  const [timeOfDay, setTimeOfDay] = useState("day")
  const [fare, setFare] = useState<null | {
    baseFare: number
    distanceFare: number
    waitingCharge: number
    totalFare: number
  }>(null)

  const calculateFare = () => {
    const cityData = cityFareData[city]
    const distanceValue = Number.parseFloat(distance)
    const waitTimeValue = waitTime ? Number.parseFloat(waitTime) : 0 // Make waiting time optional

    if (isNaN(distanceValue)) {
      return
    }

    // Calculate fare components
    const baseFare =
      city === "mumbai" ? (timeOfDay === "day" ? cityData.baseFareDay : cityData.baseFareNight) : cityData.baseFare

    const effectiveDistance = Math.max(distanceValue, cityData.minDistance)
    const distanceFare = (effectiveDistance - cityData.minDistance) * cityData.perKmRate
    const waitingCharge = waitTimeValue * cityData.waitingChargePerMin

    // Calculate total fare (rounded to nearest rupee)
    const totalFare = Math.ceil(baseFare + Math.max(0, distanceFare) + waitingCharge)

    setFare({
      baseFare,
      distanceFare: Math.max(0, distanceFare),
      waitingCharge,
      totalFare,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-yellow-500 shadow-xl overflow-hidden">
        

        <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black relative">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                fill="currentColor"
                d="M21,6H3C1.89,6 1,6.89 1,8V16C1,17.11 1.89,18 3,18H21C22.11,18 23,17.11 23,16V8C23,6.89 22.11,6 21,6M21,16H3V8H21V16M16,13H13V15H11V13H8V11H11V9H13V11H16V13Z"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-black text-yellow-400 p-2 rounded-full">
              <Calculator className="h-5 w-5" />
            </div>
            <CardTitle>Auto Rickshaw Fare Calculator</CardTitle>
          </div>
          <CardDescription className="text-black/70 font-medium">
            Calculate auto fares across major Indian cities
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              City
            </Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="city" className="w-full bg-white">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(cityFareData).map(([key, data]) => (
                  <SelectItem key={key} value={key}>
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {city === "mumbai" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Time of Day</Label>
              <div className="flex gap-4 p-1 bg-yellow-100 rounded-md">
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="timeOfDay"
                    value="day"
                    checked={timeOfDay === "day"}
                    onChange={() => setTimeOfDay("day")}
                    className="sr-only peer"
                  />
                  <div className="flex items-center justify-center gap-2 p-2 rounded-md peer-checked:bg-yellow-500 peer-checked:text-black w-full transition-all">
                    <span className="text-sm font-medium">Day</span>
                  </div>
                </label>
                <label className="flex items-center flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="timeOfDay"
                    value="night"
                    checked={timeOfDay === "night"}
                    onChange={() => setTimeOfDay("night")}
                    className="sr-only peer"
                  />
                  <div className="flex items-center justify-center gap-2 p-2 rounded-md peer-checked:bg-yellow-500 peer-checked:text-black w-full transition-all">
                    <span className="text-sm font-medium">Night (12AM-5AM)</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="distance" className="text-sm font-medium">
              Distance (km)
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="distance"
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter distance in kilometers"
                className="pl-9 bg-white"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitTime" className="text-sm font-medium">
              Waiting Time (minutes)
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="waitTime"
                type="number"
                min="0"
                placeholder="Enter waiting time in minutes"
                className="pl-9 bg-white"
                value={waitTime}
                onChange={(e) => setWaitTime(e.target.value)}
              />
            </div>
          </div>

          <Button
            className="w-full bg-black hover:bg-gray-800 text-yellow-400 font-medium py-6 transition-all"
            onClick={calculateFare}
          >
            Calculate Fare
          </Button>

          {fare && (
            <div className="mt-4 p-5 bg-white rounded-md space-y-3 shadow-inner">
              <h3 className="font-bold text-lg border-b pb-2 text-center">
                Fare Breakdown
                <span className="block text-sm font-normal text-gray-500">
                  {cityFareData[city].name} {city === "mumbai" && `(${timeOfDay === "day" ? "Day" : "Night"})`}
                </span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Base Fare:</span>
                <span className="text-right font-medium">₹{fare.baseFare.toFixed(2)}</span>

                <span className="text-gray-600">Distance Charge:</span>
                <span className="text-right font-medium">₹{fare.distanceFare.toFixed(2)}</span>

                <span className="text-gray-600">Waiting Charge:</span>
                <span className="text-right font-medium">₹{fare.waitingCharge.toFixed(2)}</span>

                <span className="font-bold pt-3 border-t text-lg">Total Fare:</span>
                <span className="text-right font-bold pt-3 border-t text-lg text-yellow-600">
                  ₹{fare.totalFare.toFixed(2)}
                </span>
              </div>

              <div className="text-xs text-gray-500 mt-3 bg-yellow-50 p-3 rounded-md">
                <p className="mb-1">• Minimum distance: {cityFareData[city].minDistance} km</p>
                <p className="mb-1">• Rate: ₹{cityFareData[city].perKmRate}/km after minimum distance</p>
                <p>• Waiting charge: ₹{cityFareData[city].waitingChargePerMin}/minute</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3 text-xs text-gray-500 justify-center bg-gray-50 py-4">
        <div className="text-center">
            <p>Note: Fares are calculated based on current rates and may vary slightly.</p>
            <p>This data may not be accurate for all cities.</p>
            <p>We do not take any responsibility for any inaccuracies or discrepancies.</p>
            <p>Do not fight with your auto rickshaw driver for any discrepancies.</p>
            <p>I just made this for fun not for some serious reason.</p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd7FQjk4Wx5sXNpvk7xmBIw7NIL8GWsz5jS2bLT2vv7hq5Vxw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
          >
            <ThumbsUp className="h-3 w-3" />
            <span>Help us improve by reviewing this calculator</span>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}
