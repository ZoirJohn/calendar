"use client"
import { meetingFormSchema } from "@/schema/meetings"
import { createMeeting } from "@/server/actions/meetings"
import { zodResolver } from "@hookform/resolvers/zod"
import { toZonedTime } from "date-fns-tz"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { formatDate, formatTimeString, formatTimezoneOffset } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { isSameDay } from "date-fns"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import Link from "next/link"
import Booking from "../Booking"

export default function MeetingForm({
        validTimes,
        eventId,
        clerkUserId,
  }: {
        validTimes: Date[]
        eventId: string
        clerkUserId: string
  }) {

        const router = useRouter()

        const form = useForm<z.infer<typeof meetingFormSchema>>({
                resolver: zodResolver(meetingFormSchema),
                defaultValues: {
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                guestName: "",
                guestEmail: "",
                guestNotes: "",
                },
        })

        const timezone = form.watch("timezone")
        const date = form.watch("date")

        const validTimesInTimezone = useMemo(() => {
                return validTimes.map(date => toZonedTime(date, timezone))
        }, [validTimes, timezone])

        async function onSubmit(values: z.infer<typeof meetingFormSchema>) {
                try {
                const meetingData =  await createMeeting({
                        ...values,
                        eventId,
                        clerkUserId,
                })

                        const path = `/book/${meetingData.clerkUserId}/${meetingData.eventId}/success?startTime=${meetingData.startTime.toISOString()}`;
                        router.push(path)
        
                } catch (error) {
                form.setError("root", {
                        message: `There was an unknown error saving your event ${error}`,
                })
                }
        }

                if (form.formState.isSubmitting) return <Booking/>

                return (
                        <Form {...form}>
                          <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex gap-6 flex-col"
                          >
                                {form.formState.errors.root && (
                                  <div className="text-destructive text-sm">
                                        {form.formState.errors.root.message}
                                  </div>
                                )}
                
                                <FormField
                                  control={form.control}
                                  name="timezone"
                                  render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Timezone</FormLabel>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                  <SelectTrigger>
                                                        <SelectValue />
                                                  </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                  {Intl.supportedValuesOf("timeZone").map(timezone => (
                                                        <SelectItem key={timezone} value={timezone}>
                                                          {timezone}
                                                          {` (${formatTimezoneOffset(timezone)})`}
                                                        </SelectItem>
                                                  ))}
                                                </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                  )}
                                />
                
                                <div className="flex gap-4 flex-col md:flex-row">
                                  <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                          <Popover>
                                                <FormItem className="flex-1">
                                                  <FormLabel>Date</FormLabel>
                                                  <PopoverTrigger asChild>
                                                        <FormControl>
                                                          <Button
                                                                variant="outline"
                                                                className={cn(
                                                                  "pl-3 text-left font-normal flex w-full",
                                                                  !field.value && "text-muted-foreground"
                                                                )}
                                                          >
                                                                {field.value ? (
                                                                  formatDate(field.value)
                                                                ) : (
                                                                  <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                          </Button>
                                                        </FormControl>
                                                  </PopoverTrigger>
                                                  <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                          mode="single"
                                                          selected={field.value}
                                                          onSelect={field.onChange}
                                                          disabled={date =>
                                                                !validTimesInTimezone.some(time =>
                                                                  isSameDay(date, time)
                                                                )
                                                          }
                                                          initialFocus
                                                        />
                                                  </PopoverContent>
                                                  <FormMessage />
                                                </FormItem>
                                          </Popover>
                                        )}
                                  />
                
                                  <FormField
                                        control={form.control}
                                        name="startTime"
                                        render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel>Time</FormLabel>
                                                <Select
                                                  disabled={date == null || timezone == null}
                                                  onValueChange={value =>
                                                        field.onChange(new Date(Date.parse(value)))
                                                  }
                                                  defaultValue={field.value?.toISOString()}
                                                >
                                                  <FormControl>
                                                        <SelectTrigger>
                                                          <SelectValue
                                                                placeholder={
                                                                  date == null || timezone == null
                                                                        ? "Select a date/timezone first"
                                                                        : "Select a meeting time"
                                                                }
                                                          />
                                                        </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                        {validTimesInTimezone
                                                          .filter(time => isSameDay(time, date))
                                                          .map(time => (
                                                                <SelectItem
                                                                  key={time.toISOString()}
                                                                  value={time.toISOString()}
                                                                >
                                                                  {formatTimeString(time)}
                                                                </SelectItem>
                                                          ))}
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                          </FormItem>
                                        )}
                                  />
                                </div>
                
                                <div className="flex gap-4 flex-col md:flex-row">
                                  <FormField
                                        control={form.control}
                                        name="guestName"
                                        render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel>Your Name</FormLabel>
                                                <FormControl>
                                                  <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                        )}
                                  />
                
                                  <FormField
                                        control={form.control}
                                        name="guestEmail"
                                        render={({ field }) => (
                                          <FormItem className="flex-1">
                                                <FormLabel>Your Email</FormLabel>
                                                <FormControl>
                                                  <Input type="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                        )}
                                  />
                                </div>
                
                                <FormField
                                  control={form.control}
                                  name="guestNotes"
                                  render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Notes</FormLabel>
                                          <FormControl>
                                                <Textarea className="resize-none" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                  )}
                                />
                
                                <div className="flex gap-2 justify-end">
                                  <Button
                                        disabled={form.formState.isSubmitting}
                                        type="button"
                                        asChild
                                        variant="outline"
                                  >
                                        <Link href={`/book/${clerkUserId}`}>Cancel</Link>
                                  </Button>
                                  <Button 
                                  className="cursor-pointer hover:scale-105 bg-blue-400 hover:bg-blue-600"
                                  disabled={form.formState.isSubmitting} 
                                  type="submit">
                                        Book Event
                                  </Button>
                                </div>
                          </form>
                        </Form>
                  )
  }
