module Jekyll
  module AP
    # Formats input date
    #
    # Input: datetime
    #
    # Output: Formatted date string
    def ap_date(datetime)
      time   = time(datetime)
      day    = time.strftime("%A")
      month  = abbrev_month(time)
      date   = time.strftime("%-d")
      year   = time.strftime("%Y")

     "#{day}, #{month} #{date}, #{year}"
    end

    # Formats input date and time
    #
    # Input: datetime
    #
    # Output: Formatted date and time string
    def ap_datetime(datetime)
      time = time(datetime)

      "#{ap_date(time)}, at #{ap_time(time)}"
    end

    # Formats input time
    #
    # Input: datetime
    #
    # Output: Formatted time string
    def ap_time(datetime)
      time = time(datetime)

      str  = ""
      str << time.strftime("%l:%M").strip
      str << time.strftime(" %p").sub('PM','p.m.').sub('AM','a.m.')
      str
    end

    private
      
      # Abbreviates Aug. through Feb.
      def abbrev_month(time)
        month = time.strftime("%-m").to_i
        
        if (month < 3 || month > 7)
          time.strftime("%b.").gsub("Sep.","Sept.")
        else
          time.strftime("%B")
        end
      end
  end
end

Liquid::Template.register_filter(Jekyll::AP)