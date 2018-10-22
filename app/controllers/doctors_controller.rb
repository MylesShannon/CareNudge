class DoctorsController < ApplicationController
    def index
        render :json => Doctor.all.order(updated_at: :desc)
    end

    def create
        doctor = Doctor.create(new_doctor_params)
        render :json => doctor
    end

    def show
        render :json => Doctor.find(params[:id])
    end

    def update
        doctor = Doctor.find(params[:id])
        doctor.update_attributes(update_doctor_params)
        render :json => doctor
    end

    def destroy
        render :json => Doctor.destroy(params[:id])
    end

    def index_with_reviews
        doctors = Doctor.all.order(updated_at: :desc).as_json
        doctors.each_with_index { |doctor, index|
            reviews = Review.where(:doctor_id => doctor['id']).order(updated_at: :desc).as_json
            doctor[:reviews] = reviews
        }
        render :json => doctors
    end

    private
    def new_doctor_params
        params.require(:doctor).require(:name)
        params.require(:doctor).permit(:name, :specialty, :description)
    end

    private
    def update_doctor_params
        params.require(:doctor).permit(:name, :specialty, :description)
    end
end 
