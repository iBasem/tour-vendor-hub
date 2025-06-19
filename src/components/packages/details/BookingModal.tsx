
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { usePackageBooking } from "@/hooks/usePackageBooking";
import { PackageDetails } from "@/hooks/usePackageDetails";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PackageDetails;
}

export function BookingModal({ isOpen, onClose, packageData }: BookingModalProps) {
  const [participants, setParticipants] = useState(1);
  const [bookingDate, setBookingDate] = useState<Date>();
  const [specialRequests, setSpecialRequests] = useState('');
  const { createBookingRequest, loading } = usePackageBooking();

  const totalPrice = packageData.base_price * participants;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingDate) {
      return;
    }

    const result = await createBookingRequest({
      packageId: packageData.id,
      participants,
      bookingDate: format(bookingDate, 'yyyy-MM-dd'),
      specialRequests
    });

    if (result.success) {
      onClose();
      setParticipants(1);
      setBookingDate(undefined);
      setSpecialRequests('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book {packageData.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="participants">Number of Participants</Label>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <Input
                id="participants"
                type="number"
                min="1"
                max={packageData.max_participants}
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum {packageData.max_participants} participants
            </p>
          </div>

          <div>
            <Label>Preferred Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !bookingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {bookingDate ? format(bookingDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={setBookingDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="requests">Special Requests (Optional)</Label>
            <Textarea
              id="requests"
              placeholder="Any special requirements or requests..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Price:</span>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4" />
                <span className="text-lg font-bold">{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              ${packageData.base_price} × {participants} participant{participants > 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !bookingDate} className="flex-1">
              {loading ? 'Submitting...' : 'Request Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
