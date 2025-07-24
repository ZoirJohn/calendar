'use client'
import { eventFormSchema } from '@/schema/events'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Switch } from '../ui/switch'
import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useTransition } from 'react'
import { createEvent, deleteEvent, updateEvent } from '@/server/actions/events'
import { Textarea } from '../ui/textarea'
import { useRouter } from 'next/navigation'
import z from 'zod'
import Link from 'next/link'

export default function EventForm({
        event,
}: {
        event?: {
                id: string
                name: string
                description: string
                durationInMinutes: number
                isActive: boolean
        }
}) {
        const router = useRouter()
        const form = useForm<z.infer<typeof eventFormSchema>>({
                resolver: zodResolver(eventFormSchema) as any,
                defaultValues: event
                        ? {
                                  ...event,
                          }
                        : {
                                  isActive: true,
                                  durationInMinutes: 30,
                                  name: '',
                                  description: '',
                          },
        })
        async function onSubmit(values: z.infer<typeof eventFormSchema>) {
                const action = event == null ? createEvent : updateEvent.bind(null, event.id)
                try {
                        await action(values)
                        router.push('/events')
                } catch (error) {
                        form.setError('root', { message: `There was an error submitting your event: ${error}` })
                }
        }
        const [isDeletePending, startDeleteTransition] = useTransition()
        return (
                <Form {...form}>
                        <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='flex flex-col gap-6'
                        >
                                {form.formState.errors.root && <div className='text-sm text-destructive'>{form.formState.errors.root.message}</div>}
                                <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Event Name</FormLabel>
                                                        <FormControl>
                                                                <Input {...field} />
                                                        </FormControl>
                                                        <FormDescription>The name users will see when booking</FormDescription>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                ></FormField>
                                <FormField
                                        control={form.control}
                                        name='durationInMinutes'
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Duration</FormLabel>
                                                        <FormControl>
                                                                <Input
                                                                        type='number'
                                                                        {...field}
                                                                />
                                                        </FormControl>
                                                        <FormDescription>In minutes</FormDescription>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />
                                <FormField
                                        control={form.control}
                                        name='description'
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                                <Textarea
                                                                        className='h-32 resize-none'
                                                                        {...field}
                                                                />
                                                        </FormControl>
                                                        <FormDescription>Optional description of the event</FormDescription>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                />
                                <FormField
                                        control={form.control}
                                        name='isActive'
                                        render={({ field }) => (
                                                <FormItem>
                                                        <FormControl>
                                                                <div>
                                                                        <Switch
                                                                                checked={field.value}
                                                                                onCheckedChange={field.onChange}
                                                                        ></Switch>
                                                                        <FormLabel>Active</FormLabel>
                                                                </div>
                                                        </FormControl>
                                                        <FormDescription>Inactive events will not be visible for users to book</FormDescription>
                                                        <FormMessage />
                                                </FormItem>
                                        )}
                                ></FormField>
                                {event && (
                                        <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                        <Button
                                                                className='cursor-pointer'
                                                                variant='destructive'
                                                                disabled={isDeletePending || form.formState.isSubmitting}
                                                        >Delete</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>This action cannot be undone. This will permanently delete this event</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                                <AlertDialogAction
                                                                        onClick={() => {
                                                                                startDeleteTransition(async () => {
                                                                                        try {
                                                                                                await deleteEvent(event.id)
                                                                                                router.push('/events')
                                                                                        } catch (error) {
                                                                                                form.setError('root', { message: `There was an error deleting your event: ${error}` })
                                                                                        }
                                                                                })
                                                                        }}
                                                                >
                                                                        Delete
                                                                </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                </AlertDialogContent>
                                        </AlertDialog>
                                )}
                                <Button
                                        disabled={isDeletePending || form.formState.isSubmitting}
                                        variant='outline'
                                        className='cursor-pointer'
                                        asChild
                                >
                                        <Link href='/events'>Cancel</Link>
                                </Button>
                                <Button
                                        disabled={isDeletePending || form.formState.isSubmitting}
                                        className='cursor-pointer'
                                        type='submit'
                                >
                                        Save
                                </Button>
                        </form>
                </Form>
        )
}
